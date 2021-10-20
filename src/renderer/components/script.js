export default {
  script: `tell application "Capture One 20"
    activate
end tell

tell application "System Events"
    tell process "Capture One 20"
        -- 遍历查找对应的 window
        global win
        set win to 0
        repeat with w in windows
            if exists of radio button 2 of radio group 1 of w then
                set win to w
            end if
        end repeat
        
        if win = 0 then
            display notification "无法获取有效窗口" with title "AppleScript错误"
            return
        end if
        
        -- 点击相机图标
        click radio button 2 of radio group 1 of win
        delay 0.1
        
        global destination
        set destination to 0
        
        -- 遍历检查 group 里面是否有 scroll area 2 -> "NextCaptureLocation" -> "目的地"
        repeat with g in every group of win
            
            -- 遍历每一个 scroll area，找到包含 "NextCaptureLocation" 的那一个，最终找到 destination
            repeat with sa in every scroll area of g
                if exists of group "NextCaptureLocation" of sa then
                    set nextCaptureLocation to group "NextCaptureLocation" of sa
                    
                    -- 中文版
                    if exists of group "目的地" of nextCaptureLocation then
                        set destination to group "目的地" of nextCaptureLocation
                    end if
                    
                    -- 英文版
                    if exists of group "Destination" of nextCaptureLocation then
                        set destination to group "Destination" of nextCaptureLocation
                    end if
                end if
            end repeat
            
        end repeat
        
        -- 判断 destination 是否获取到，没有获取到则提示并退出 applescript
        if destination = 0 then
            display notification "无法获取目标元素 Destination" with title "AppleScript错误"
            return
        end if
        
        -- 点击选择文件夹，并设置为自定义的文件夹
        click pop up button 1 of destination
        click menu item -1 of menu 1 of pop up button 1 of destination
        delay 1
        -- Finder 里面 shift + command + G 可以自己手动输入路径
        key code 5 using {shift down, command down}
        delay 1
        -- 清空弹出文本域的内容
        key code 0 using {command down} -- command + A
        key code 51 -- 51 对应回车键
        delay 1
        -- 输入自定义的路径
        set the clipboard to "{{destination}}"
        --        keystroke "/tmp"
        -- 输入法会影响，所以使用粘贴的方式
        key code 9 using {command down} -- command + v
        delay 1
        keystroke return
        delay 1
        keystroke return
        
    end tell
end tell`,
};
