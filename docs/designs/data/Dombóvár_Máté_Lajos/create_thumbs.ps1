Add-Type -AssemblyName System.Drawing

$sourceDir = "C:\_Repositories\uncut\docs\designs\data\Dombóvár_Máté_Lajos"
$thumbDir = "$sourceDir\thumbs"

$files = Get-ChildItem "$sourceDir\*.jpg"

foreach ($file in $files) {
    Write-Host "Processing: $($file.Name)"

    $img = [System.Drawing.Image]::FromFile($file.FullName)

    $thumbWidth = 300
    $thumbHeight = [int]($img.Height * $thumbWidth / $img.Width)

    $thumb = New-Object System.Drawing.Bitmap($thumbWidth, $thumbHeight)
    $graphics = [System.Drawing.Graphics]::FromImage($thumb)
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

    $graphics.DrawImage($img, 0, 0, $thumbWidth, $thumbHeight)

    $thumbPath = Join-Path $thumbDir $file.Name
    $thumb.Save($thumbPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)

    $graphics.Dispose()
    $thumb.Dispose()
    $img.Dispose()

    Write-Host "Created: $thumbPath"
}

Write-Host "All thumbnails created successfully!"
