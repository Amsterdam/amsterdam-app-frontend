#!/bin/bash
if [ -n "$BUILD_NUMBER" ]; then
    build_number=$BUILD_NUMBER
else
    build_number=1
fi

app_version=$(cat $PROJECT_DIR/../package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[",]//g' | tr -d '[[:space:]]')

target_plist="$TARGET_BUILD_DIR/$INFOPLIST_PATH"
dsym_plist="$DWARF_DSYM_FOLDER_PATH/$DWARF_DSYM_FILE_NAME/Contents/Info.plist"

for plist in "$target_plist" "$dsym_plist"; do
if [ -f "$plist" ]; then
/usr/libexec/PlistBuddy -c "Set :CFBundleVersion $build_number" "$plist"
/usr/libexec/PlistBuddy -c "Set :CFBundleShortVersionString $app_version" "$plist"
fi
done
