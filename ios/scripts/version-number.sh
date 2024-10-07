#!/bin/bash
exec > >(tee -a /dev/tty) 2>&1
if [ -n "$BUILD_NUMBER" ]; then
    build_number=$BUILD_NUMBER
else
    build_number=1
fi
echo "Build number: $build_number" >&1

app_version=$(cat $PROJECT_DIR/../package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[",]//g' | tr -d '[[:space:]]')
echo "Version number: $app_version" >&1

target_plist="$TARGET_BUILD_DIR/$INFOPLIST_PATH"
dsym_plist="$DWARF_DSYM_FOLDER_PATH/$DWARF_DSYM_FILE_NAME/Contents/Info.plist"
echo "target_plist: $target_plist" >&1
echo "dsym_plist: $dsym_plist" >&1

for plist in "$target_plist" "$dsym_plist"; do
if [ -f "$plist" ]; then
echo "Updating Plist: $plist" >&1
/usr/libexec/PlistBuddy -c "Set :CFBundleVersion $build_number" "$plist"
/usr/libexec/PlistBuddy -c "Set :CFBundleShortVersionString $app_version" "$plist"
else 
echo "Plist file not found: $plist" >&1
fi
done