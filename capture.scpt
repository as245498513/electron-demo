tell application "Capture One 21"
	activate
	tell application "System Events"
		tell process "Capture One 21"
			click menu item 3 of menu "相机" of menu bar 1
		end tell
	end tell
	activate
	tell application "System Events"
		key code 5 using {shift down, command down}
		keystroke "/tmp"
		keystroke return
		delay 1
		keystroke return
	end tell
end tell
