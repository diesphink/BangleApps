Bangle.js App Loader (and Apps)
================================
Fork to host my apps. 

App Loader instance [here](https://diesphink.github.io/BangleApps/).

Original readme [here](README_ORIGINAL.md).

The release version is manually refreshed with regular intervals while the development version is continuously updated as new code is committed to this repository.

**All software (including apps) in this repository is MIT Licensed - see [LICENSE](LICENSE)** By
submitting code to this repository you confirm that you are happy with it being MIT licensed,
and that it is not licensed in another way that would make this impossible.

More simple forks
===
- [Languages](apps/locale) - locale, just a version of pt_BR with only formatting, no translation of text

# SPH Clock

Hacky clock for my bangle.js 2, with a "vintage menu kind of 50s" look. [Code](apps/sphclock).

![Screenshot](apps/sphclock/screenshot.png) ![Screenshot](apps/sphclock/screenshot2.png)

# SPH Weather

Simple weather forecast app with graphs for temperature and prob. of rain. [Code](apps/sphweather).

![Screenshot](apps/sphweather/screenshot.png)

# SPH Calendar

Simple calendar with a vintage menu style. [Code](apps/sphcalendar).

![Screenshot](apps/sphcalendar/screenshot.png)

# SPH Launcher

Launcher with a vintage menu style. [Code](apps/sphlauncher).

![Screenshot](apps/sphlauncher/screenshot.png)

# SPH 2FA

2FA TOTP generator. Forked and drop-in replacement for the authentiwatch. [Code](apps/sph2fa).

![Screenshot](apps/sph2fa/screenshot1.png)
![Screenshot](apps/sph2fa/screenshot2.png)
![Screenshot](apps/sph2fa/screenshot3.png)
![Screenshot](apps/sph2fa/screenshot4.png)


# SPH Menu

Menu replacement with small text, doesn't work well with widgets. [Code](apps/sphmenu).

![Screenshot](apps/sphmenu/screenshot.png)


# Font LECO 1976 Regular

Module for font LECO 1976 Regular, with a small adaptation on small sizes, removed serif for better legibility [Code](apps/leco1976).

Available sizes: 42, 20, 14, 12, 11, 8

### Offline

Using the 'Storage' icon in [the Web IDE](https://www.espruino.com/ide/)
(4 discs), upload your files into the places described in your JSON:

* `app-icon.js` -> `myappid.img`

Now load `app.js` up in the editor, and click the down-arrow to the bottom
right of the `Send to Espruino` icon. Click `Storage` and then either choose
`myappid.app.js` (if you'd uploaded your app previously), or `New File`
and then enter `myappid.app.js` as the name.

Now, clicking the `Send to Espruino` icon will load the app directly into
Espruino **and** will automatically run it.

When you upload code this way, your app will even be uploaded to Bangle.js's menu
without you having to use the `Bangle App Loader`

**Note:** Widgets need to be run inside a clock or app, so if you're
developing a widget you need to go go `Settings` -> `Communications` -> `Load after saving`
and set it to `Load default application`.

## Example Applications

To make the process easier we've come up with some example applications that you can use as a base
when creating your own. Just come up with a unique name (ideally lowercase, under 20 chars), copy `apps/_example_app`
or `apps/_example_widget` to `apps/myappid`, and edit `apps/myappid/metadata.json` accordingly.

**Note:** the max filename length is 28 chars, so we suggest an app ID of under
20 so that when `.app.js`/etc gets added to the end the filename isn't cropped.

**If you're making a widget** please start the name with `wid` to make
it easy to find!

### App Example

The app example is available in [`apps/_example_app`](apps/_example_app)

Apps are listed in the Bangle.js menu, accessible from a clock app via the middle button.

* `metadata.json` - describes the app to bootloader and loader
* `app.png` - app icon - 48x48px
* `app-icon.js` - JS version of the icon (made with http://www.espruino.com/Image+Converter) for use in Bangle.js's menu
* `app.js` - app code
* `ChangeLog` - A file containing a list of changes to your app so users can see what's changed

#### `app-icon.js`

The icon image and short description is used in Bangle.js's launcher.

Use the Espruino [image converter](https://www.espruino.com/Image+Converter) and upload your `app.png` file.

Follow this steps to create a readable icon as image string.

1. upload a 48x48 png file - THE IMAGE SHOULD BE 48x48 OR LESS
2. set _X_ Use Compression
3. set _X_ Transparency (optional)
4. set Diffusion: _flat_
5. set Colours: _1 bit_, any of the Optimised options, or _8 bit Web Palette_ are best
6. set Output as: _Image String_

Replace this line with the image converter output:

```
require("heatshrink").decompress(atob("mEwwJC/AH4A/AH4AgA=="))
```

**Do not add a trailing semicolon**

You can also use this converter for creating images you like to draw with `g.drawImage()` with your app.

Apps that need widgets can call `Bangle.loadWidgets()` **once** at startup to load
them, and then `Bangle.drawWidgets()` to draw them onto the screen whenever the app
has call to completely clear the screen. Widgets themselves will update as and when needed.

### Widget Example

The widget example is available in [`apps/_example_widget`](apps/_example_widget)

* `metadata.json` - describes the widget to bootloader and loader
* `widget.js` - widget code

Widgets are just small bits of code that run whenever an app that supports them
calls `Bangle.loadWidgets()`. If they want to display something in the 24px high
widget bar at the top of the screen they can add themselves to the global
`WIDGETS` array with:

```
WIDGETS["mywidget"]={
  area:"tl", // tl (top left), tr (top right), bl (bottom left), br (bottom right)
  sortorder:0, // (Optional) determines order of widgets in the same corner
  width: 24, // how wide is the widget? You can change this and call Bangle.drawWidgets() to re-layout
  draw:draw // called to draw the widget
};
```

When the widget is to be drawn, `x` and `y` values are set up in `WIDGETS["mywidget"]`
and `draw` can then use `this.x` and `this.y` to figure out where it needs to draw to.


### ChangeLog

This is a file containing a list of changes to your app so users can see what's changed, for example:

```
0.01: New App!
0.02: Changed the colors
0.03: Made the app run quicker
```

Entries should be newest last, with the version number of the last entry matching the version in `metadata.json`

Please keep the same format at the example as the file needs to be parsed by the BangleApps tools.

### `app.info` format

This is the file that's **auto-generated** from `metadata.json` and loaded onto Bangle.js by the App Loader,
and which gives information about the app for the Launcher.

```
{
  "name":"Short Name", // for Bangle.js menu
  "icon":"*myappid", // for Bangle.js menu
  "src":"-myappid", // source file
  "type":"widget/clock/app/bootloader/...", // optional, default "app"
     // see 'type' in 'metadata.json format' below for more options/info
  "version":"1.23",
     // added by BangleApps loader on upload based on metadata.json
  "files:"file1,file2,file3",
     // added by BangleApps loader on upload - lists all files
     // that belong to the app so it can be deleted
  "data":"appid.data.json,appid.data?.json;appidStorageFile,appidStorageFile*"
     // added by BangleApps loader on upload - lists files that
     // the app might write, so they can be deleted on uninstall
     // typically these files are not uploaded, but created by the app
     // these can include '*' or '?' wildcards
}
```

### `metadata.json` format

```
{ "id": "appid",              // 7 character app id
  "name": "Readable name",    // readable name
  "shortName": "Short name",  // short name for launcher
  "version": "0v01",          // the version of this app
  "description": "...",       // long description (can contain markdown)
  "icon": "icon.png",         // icon in apps/
  "screenshots" : [ { "url":"screenshot.png" } ], // optional screenshot for app
  "type":"...",               // optional(if app) -
                              //   'app' - an application
                              //   'clock' - a clock - required for clocks to automatically start
                              //   'widget' - a widget
                              //   'module' - this provides a module that can be used with 'require'.
                              //              'provides_modules' should be used if type:module is specified
                              //   'bootloader' - an app that at startup (app.boot.js) but doesn't have a launcher entry for 'app.js'
                              //   'settings' - apps that appear in Settings->Apps (with appname.settings.js) but that have no 'app.js'
                              //   'clkinfo' - Provides a 'myapp.clkinfo.js' file that can be used to display info in clocks - see modules/clock_info.js
                              //   'RAM' - code that runs and doesn't upload anything to storage
                              //   'launch' - replacement 'Launcher'
                              //   'textinput' - provides a 'textinput' library that allows text to be input on the Bangle
                              //   'scheduler' - provides 'sched' library and boot code for scheduling alarms/timers
                              //                 (currently only 'sched' app)
                              //   'notify' - provides 'notify' library for showing notifications
                              //   'locale' - provides 'locale' library for language-specific date/distance/etc
                              //              (a version of 'locale' is included in the firmware)
  "tags": "",                 // comma separated tag list for searching
                              // common types are:
                              //   'clock' - it's a clock
                              //   'widget' - it is (or provides) a widget
                              //   'outdoors' - useful for outdoor activities
                              //   'tool' - a useful utility (timer, calculator, etc)
                              //   'game' - a game
                              //   'bluetooth' - uses Bluetooth LE
                              //   'system' - used by the system
                              //   'clkinfo' - provides or uses clock_info module for data on your clock face or clocks that support it (see apps/clock_info/README.md)
                              //   'health' - e.g. heart rate monitors or step counting
  "supports": ["BANGLEJS2"],  // List of device IDs supported, either BANGLEJS or BANGLEJS2
  "dependencies" : { "notify":"type" } // optional, app 'types' we depend on (see "type" above)
  "dependencies" : { "messages":"app" } // optional, depend on a specific app ID
                              // for instance this will use notify/notifyfs is they exist, or will pull in 'notify'
  "dependencies" : { "messageicons":"module" } // optional, depend on a specific library to be used with 'require' - see provides_modules
  "dependencies" : { "message":"widget" } // optional, depend on a specific type of widget - see provides_widgets
  "provides_modules" : ["messageicons"] // optional, this app provides a module that can be used with 'require'
  "provides_widgets" : ["battery"] // optional, this app provides a type of widget - 'alarm/battery/bluetooth/pedometer/message'
  "default" : true,           // set if an app is the default implementer of something (a widget/module/etc)
  "readme": "README.md",      // if supplied, a link to a markdown-style text file
                              // that contains more information about this app (usage, etc)
                              // A 'Read more...' link will be added under the app

  "custom": "custom.html",    // if supplied, apps/custom.html is loaded in an
                              // iframe, and it must post back an 'app' structure
                              // like this one with 'storage','name' and 'id' set up
                              // see below for more info

  "customConnect": true,      // if supplied, ensure we are connected to a device
                              // before the "custom.html" iframe is loaded. An
                              // onInit function in "custom.html" is then called
                              // with info on the currently connected device.

  "interface": "interface.html",   // if supplied, apps/interface.html is loaded in an
                              // iframe, and it may interact with the connected Bangle
                              // to retrieve information from it
                              // see below for more info

  "allow_emulator":true,      // if 'app.js' will run in the emulator, set to true to
                              // add an icon to allow your app to be tested

  "storage": [                // list of files to add to storage
    {"name":"appid.js",       // filename to use in storage.
                              // If name=='RAM', the code is sent directly to Bangle.js and is not saved to a file
     "url":"",                // URL of file to load (currently relative to apps/)
     "content":"...",         // if supplied, this content is loaded directly
     "evaluate":true,         // if supplied, data isn't quoted into a String before upload
                              // (eg it's evaluated as JS)
     "noOverwrite":true       // if supplied, this file will not be overwritten if it
                              // already exists
     "supports": ["BANGLEJS2"]// if supplied, this file will ONLY be uploaded to the device
                              // types named in the array. This allows different versions of
                              // the app to be uploaded for different platforms
    },
  ]
  "data": [                   // list of files the app writes to
    {"name":"appid.data.json",  // filename used in storage
     "storageFile":true       // if supplied, file is treated as storageFile
     "url":"",                // if supplied URL of file to load (currently relative to apps/)
     "content":"...",         // if supplied, this content is loaded directly
     "evaluate":true,         // if supplied, data isn't quoted into a String before upload
                              // (eg it's evaluated as JS)
    },
    {"wildcard":"appid.data.*" // wildcard of filenames used in storage
    },                         // this is mutually exclusive with using "name"
  ],
  "sortorder" : 0,            // optional - choose where in the list this goes.
                              // this should only really be used to put system
                              // stuff at the top
}
```

* name, icon and description present the app in the app loader.
* tags is used for grouping apps in the library, separate multiple entries by comma. Known tags are `tool`, `system`, `clock`, `game`, `sound`, `gps`, `widget`, `launcher`, `bluetooth` or empty.
* storage is used to identify the app files and how to handle them
* data is used to clean up files when the app is uninstalled

### `metadata.json`: `custom` element

Apps that can be customised need to define a `custom` element in `metadata.json`,
which names an HTML file in that app's folder.

When `custom` is defined, the 'upload' button is replaced by a customize
button, and when clicked it opens the HTML page specified in an iframe.

In that HTML file you're then responsible for handling a button
press and calling `sendCustomizedApp` with your own customised
version of what's in `metadata.json`:

```
<html>
  <head>
    <link rel="stylesheet" href="../../css/spectre.min.css">
  </head>
  <body>
    <p><button id="upload" class="btn btn-primary">Upload</button></p>
    <script src="../../lib/customize.js"></script>
    <script>
      document.getElementById("upload").addEventListener("click", function() {
        sendCustomizedApp({
          id : "myappid",
          storage:[
            {name:"myappid.app.js", url:"app.js", content:app_source_code},
            {name:"myappid.img", content:'require("heatshrink").decompress(atob("mEwg...4"))', evaluate:true},
          ]
        });
      });
    </script>
  </body>
</html>
```

This'll then be loaded in to the watch. See [apps/qrcode/grcode.html](the QR Code app)
for a clean example.

**Note:** we specify a `url` for JS files even though it doesn't have to exist
and will never be loaded. This is so the app loader can tell if it's a JavaScript
file based on the extension, and if so it can minify and pretokenise it.

### `metadata.json`: `interface` element

Apps that create data that can be read back can define a `interface` element in `metadata.json`,
which names an HTML file in that app's folder.

When `interface` is defined, a `Download from App` button is added to
the app's description, and when clicked it opens the HTML page specified
in an iframe.

```
<html>
  <head>
    <link rel="stylesheet" href="../../css/spectre.min.css">
  </head>
  <body>
    <script src="../../core/lib/interface.js"></script>
    <div id="t">Loading...</div>
    <script>
      function onInit() {
        Puck.eval("E.getTemperature()", temp=> {
          document.getElementById("t").innerHTML = temp;
        });
      }
    </script>
  </body>
</html>
```

When the page is ready a function called `onInit` is called,
and in that you can call `Puck.write` and `Puck.eval` to get
the data you require from Bangle.js.

See [apps/gpsrec/interface.html](the GPS Recorder) for a full example.

### Adding configuration to the "Settings" menu

Apps (or widgets) can add their own settings to the "Settings" menu under "App/widget settings".
To do so, the app needs to include a `settings.js` file, containing a single function
that handles configuring the app.
When the app settings are opened, this function is called with one
argument, `back`: a callback to return to the settings menu.

Usually it will save any information in `myappid.json` where `myappid` is the name
of your app - so you should change the example accordingly.

Example `settings.js`
```js
// make sure to enclose the function in parentheses
(function(back) {
  let settings = require('Storage').readJSON('myappid.json',1)||{};
  if (typeof settings.monkeys !== "number") settings.monkeys = 12; // default value
  function save(key, value) {
    settings[key] = value;
    require('Storage').write('myappid.json', settings);
  }
  const appMenu = {
    '': {'title': 'App Settings'},
    '< Back': back,
    'Monkeys': {
      value: settings.monkeys,
      onchange: (m) => {save('monkeys', m)}
    }
  };
  E.showMenu(appMenu)
})
```
In this example the app needs to add `myappid.settings.js` to `storage` in `metadata.json`.
It should also add `myappid.json` to `data`, to make sure it is cleaned up when the app is uninstalled.
```json
  { "id": "myappid",
    ...
    "storage": [
      ...
      {"name":"myappid.settings.js","url":"settings.js"}
    ],
    "data": [
      {"name":"myappid.json"}
    ]
  },
```

## Modules

You can include any of [Espruino's modules](https://www.espruino.com/Modules) as
normal with `require("modulename")`. To include [Bangle's modules](modules) for use in the Web
IDE, [upload the modules to internal storage](modules#upload-the-module-to-the-bangles-internal-storage)
or [change the IDE's search path](modules#change-the-web-ide-search-path-to-include-banglejs-modules).
If you want to develop your own module for your
app(s) then you can do that too. Just add the module into the `modules` folder
then you can use it from your app as normal.

You won't be able to develop apps using your own modules with the IDE,
so instead we'd recommend you write your module to a Storage File called
`modulename` on Bangle.js. You can then develop your app as normal on Bangle.js
from the IDE.

## Coding hints

- use `g.setFont(.., size)` to multiply the font size, eg ("6x8",3) : "18x24"

- use `g.drawString(text,x,y,true)` to draw with background color to overwrite existing text

- use `g.clearRect()` to clear parts of the screen, instead of using `g.clear()`

- use `g.fillPoly()` or `g.drawImage()` for complex graphic elements

- using `g.clear()` can cause screen flicker

- using `g.setLCDBrightness()` can save you power during long periods with lcd on

- chaining graphics methods, eg `g.setColor(0xFD20).setFontAlign(0,0).setfont("6x8",3)`

### Misc Notes

- Need to save state? Use the `E.on('kill',...)` event to save JSON to a file called `myappid.json`, then load it at startup.

- 'Alarm' apps define a file called `alarm.js` which handles the actual alarm window.

- Locale is handled by `require("locale")`. An app may create a `locale` file in Storage which is
a module that overwrites Bangle.js's default locale.


### Graphic areas

The screen is parted in a widget and app area for lcd mode `direct`(default).

| areas | as rectangle or point |
| :-:| :-: |
| Widget | (0,0,239,23) |
| Apps | (0,24,239,239) |
| BTN1 | (230, 55)  |
| BTN2 | (230, 140) |
| BTN3 | (230, 210) |
| BTN4 | (0,0,119, 239)|
| BTN5 |  (120,0,239,239) |

- Use `g.setFontAlign(0, 0, 3)` to draw rotated string to BTN1-BTN3 with `g.drawString()`.

- For BTN4-5 the touch area is named

## Available colors

You can use `g.setColor(r,g,b)` OR `g.setColor(16bitnumber)` - some common 16 bit colors are below:

| color-name | color-value|
| :-: | :-: |
| Black | 0x0000 |
| Navy | 0x000F |
| DarkGreen | 0x03E0 |
| DarkCyan | 0x03EF |
| Maroon | 0x7800 |
| Purple | 0x780F |
| Olive | 0x7BE0
| LightGray | 0xC618
| DarkGrey | 0x7BEF
| Blue | 0x001F
| Green | 0x07E0 |
| Cyan | 0x07FF |
| RED | 0xF800 |
| Magenta | 0xF81F |
| Yellow | 0xFFE0 |
| White | 0xFFFF |
| Orange | 0xFD20 |
| GreenYellow | 0xAFE5 |
| Pink | 0xF81F |

## Fonts

A recent addition to Bangle.js is the ability to use extra fonts with support for more characters.
For example [all regions](https://banglejs.com/apps/?id=fontall) or [extended](https://banglejs.com/apps/?id=fontext) fonts.

Once installed, these apps cause a new font, `Intl` to be added to `Graphics`, which can be used with just `g.setFont("Intl")`.

There is also a `font` library - this is not implemented yet, but more information about the planned implementation
is available at https://github.com/espruino/BangleApps/issues/3109

For now, to make your app work with the international font, you can check if `Graphics.prototype.setFontIntl` exists,
and if so you can change the font you plan on using:

```JS
myFont = "6x8:2";
if (Graphics.prototype.setFontIntl)
  myFont = "Intl";
```

Any new Font library must contain the metadata `"icon": "app.png", "tags": "font", "type": "module", "provides_modules" : ["fonts"],`
and should provide a `font` library, as well as a `boot.js` that adds `Graphics.prototype.setFontIntl`. If you plan on
making a new library it's best to just copy one of the existing ones for now.


## API Reference

[Reference](http://www.espruino.com/Reference#software)

[Bangle Class](https://banglejs.com/reference#Bangle)

[Graphics Class](https://banglejs.com/reference#Graphics)

## 'Testing' folder

The [`testing`](testing) folder contains snippets of code that might be useful for your apps.

* `testing/colors.js` - 16 bit colors as name value pairs
* `testing/gpstrack.js` - code to store a GPS track in Bangle.js storage and output it back to the console

## Credits

The majority of icons used for these apps are from [Icons8](https://icons8.com/) - we have a commercial license but icons are also free for Open Source projects.
