Add-Type -AssemblyName System.Drawing

function Create-Thumbnail {
    param(
        [string]$filename
    )

    $sourceFile = Join-Path (Get-Location) $filename
    $thumbDir = Join-Path (Get-Location) "thumbs"
    $thumbFile = Join-Path $thumbDir $filename

    Write-Host "Processing: $filename"

    $img = [System.Drawing.Image]::FromFile($sourceFile)

    $thumbWidth = 300
    $thumbHeight = [int]($img.Height * $thumbWidth / $img.Width)

    $thumb = New-Object System.Drawing.Bitmap($thumbWidth, $thumbHeight)
    $graphics = [System.Drawing.Graphics]::FromImage($thumb)
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality

    $graphics.DrawImage($img, 0, 0, $thumbWidth, $thumbHeight)

    $thumb.Save($thumbFile, [System.Drawing.Imaging.ImageFormat]::Jpeg)

    $graphics.Dispose()
    $thumb.Dispose()
    $img.Dispose()

    Write-Host "Created: thumbs\$filename"
}

# Create thumbnails for all 10 images
Create-Thumbnail "F41032.jpg"
Create-Thumbnail "F41054.jpg"
Create-Thumbnail "F41063.jpg"
Create-Thumbnail "F41074.jpg"
Create-Thumbnail "F41085.jpg"
Create-Thumbnail "F41104.jpg"
Create-Thumbnail "F41113.jpg"
Create-Thumbnail "F41118.jpg"
Create-Thumbnail "F41123.jpg"
Create-Thumbnail "F41193.jpg"
Create-Thumbnail "F41217.jpg"

Write-Host "All thumbnails created successfully!"
