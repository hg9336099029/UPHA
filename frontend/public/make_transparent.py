import sys
try:
    from PIL import Image
except ImportError:
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "pillow"])
    from PIL import Image

def make_transparent(filename, threshold=30):
    try:
        img = Image.open(filename).convert("RGBA")
        datas = img.getdata()

        # Assuming the top-left pixel is the background color
        bg_color = datas[0]
        
        newData = []
        for item in datas:
            # Check if the pixel color is close to the background color
            if (abs(item[0] - bg_color[0]) <= threshold and
                abs(item[1] - bg_color[1]) <= threshold and
                abs(item[2] - bg_color[2]) <= threshold):
                newData.append((255, 255, 255, 0)) # Transparent
            else:
                newData.append(item)

        img.putdata(newData)
        img.save(filename, "PNG")
        print(f"Successfully processed {filename}")
    except Exception as e:
        print(f"Error processing {filename}: {e}")

images = ["hero-section.png", "UPOA.png", "HAI.png"]
for img in images:
    make_transparent(img)
