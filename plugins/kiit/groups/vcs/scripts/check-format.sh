#!/bin/sh
# Checks a value against a pattern. Prints one line, exits 0 (ok) or 1 (not ok).
# usage: check-format.sh <pattern> <types, space separated> <max length> <value>
# Placeholders: {type} lowercase type, {TYPE} uppercase type, {date} YYMMDD,
#               {ref} and {name} lowercase letters, digits and -, {description} any text.
pattern=$1 types=$2 max=$3 value=$4
[ $# -eq 4 ] || { echo "error: usage: check-format.sh <pattern> <types> <max> <value>"; exit 1; }
lower=$(echo "$types" | tr ' ' '|')
upper=$(echo "$types" | tr 'a-z' 'A-Z' | tr ' ' '|')
re=$(printf '%s' "$pattern" | sed -e 's/[.[\*^$()+?|]/\\&/g' \
  -e "s/{type}/($lower)/g" -e "s/{TYPE}/($upper)/g" \
  -e 's/{date}/[0-9]{6}/g' -e 's/{ref}/[a-z0-9]+(-[a-z0-9]+)*/g' \
  -e 's/{name}/[a-z0-9]+(-[a-z0-9]+)*/g' \
  -e 's/{description}/.+/g')
if ! printf '%s' "$value" | grep -Eq "^$re\$"; then
  echo "fail: '$value' does not match $pattern (types: $types)"; exit 1
fi
if [ "${#value}" -gt "$max" ]; then
  echo "fail: '$value' is ${#value} characters, the limit is $max"; exit 1
fi
echo "ok: $value"
