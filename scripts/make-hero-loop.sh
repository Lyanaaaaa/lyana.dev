#!/usr/bin/env bash
# Turn an AI-generated clip into the hero background loop (video + optional ambient audio).
# Usage: scripts/make-hero-loop.sh [input.mp4] [fade-seconds]
#   default input: public/resources/hero-raw.mp4, default seam crossfade: 0.8s
# Env:
#   BED="start:end:until"  Patch an uneven room tone: copy the clip's own ambience from start..end
#                          (a stretch with no typing) under 0..until, so the bed never drops out.
#                          For the 2026-11 clip: BED=4.6:5.8:4.45
#   NO_AUDIO=1             Strip audio entirely.
# Output: public/resources/hero-lyana.mp4 (seamless loop, 1280px wide, AAC if the source has audio)
#         public/resources/hero-lyana-poster.jpg (first frame, shown while the video loads)
#
# Seamless loop: drop the first FADE seconds, then crossfade the clip's tail into those dropped
# opening frames (video xfade + audio equal-power acrossfade on the same cut, so they stay in sync).
set -euo pipefail

cd "$(dirname "$0")/.."
IN="${1:-public/resources/hero-raw.mp4}"
FADE="${2:-0.8}"
OUT="public/resources/hero-lyana.mp4"
POSTER="public/resources/hero-lyana-poster.jpg"

[ -f "$IN" ] || { echo "Missing $IN"; exit 1; }

DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$IN")
OFFSET=$(awk -v d="$DUR" -v f="$FADE" 'BEGIN { printf "%.3f", d - 2 * f }')
HAS_AUDIO=$(ffprobe -v error -select_streams a -show_entries stream=index -of csv=p=0 "$IN" | head -1)

VIDEO="[0:v]scale=1280:-2:flags=lanczos,fps=30,format=yuv420p,split[va][vb];
  [va]trim=start=${FADE},setpts=PTS-STARTPTS[vbody];
  [vb]trim=end=${FADE},setpts=PTS-STARTPTS[vhead];
  [vbody][vhead]xfade=transition=fade:duration=${FADE}:offset=${OFFSET},format=yuv420p[v]"

if [ -n "$HAS_AUDIO" ] && [ -z "${NO_AUDIO:-}" ]; then
  if [ -n "${BED:-}" ]; then
    IFS=: read -r BS BE BU <<<"$BED"
    # Ping-pong the ambience (forward, reversed, ...) so the joins are continuous, then fade it
    # out just as the clip's own ambience takes over.
    MIX="[0:a]aresample=48000,asplit=2[orig][b0];
  [b0]atrim=start=${BS}:end=${BE},asetpts=PTS-STARTPTS,asplit=4[s1][s2][s3][s4];
  [s2]areverse[r2];[s4]areverse[r4];
  [s1][r2][s3][r4]concat=n=4:v=0:a=1,atrim=end=$(awk -v u="$BU" 'BEGIN{print u+0.3}'),afade=t=out:st=${BU}:d=0.3[bed];
  [orig][bed]amix=inputs=2:duration=first:normalize=0[mix]"
  else
    MIX="[0:a]aresample=48000,anull[mix]"
  fi
  AUDIO="${MIX};
  [mix]highpass=f=90,acompressor=threshold=-24dB:ratio=2.5:attack=5:release=150,alimiter=limit=0.7:level=disabled,loudnorm=I=-24:TP=-3:LRA=7,aresample=48000,asplit=2[aa][ab];
  [aa]atrim=start=${FADE},asetpts=PTS-STARTPTS[abody];
  [ab]atrim=end=${FADE},asetpts=PTS-STARTPTS[ahead];
  [abody][ahead]acrossfade=d=${FADE}:c1=qsin:c2=qsin[a]"
  ffmpeg -y -loglevel error -i "$IN" -filter_complex "${VIDEO};${AUDIO}" \
    -map "[v]" -map "[a]" -c:v libx264 -preset slow -crf 26 -c:a aac -b:a 96k -ac 2 -shortest -movflags +faststart "$OUT"
else
  ffmpeg -y -loglevel error -i "$IN" -filter_complex "$VIDEO" \
    -map "[v]" -an -c:v libx264 -preset slow -crf 26 -movflags +faststart "$OUT"
fi

ffmpeg -y -loglevel error -i "$OUT" -frames:v 1 -q:v 3 "$POSTER"

echo "Wrote $OUT ($(du -h "$OUT" | cut -f1), $(ffprobe -v error -show_entries format=duration -of csv=p=0 "$OUT")s) and $POSTER"
