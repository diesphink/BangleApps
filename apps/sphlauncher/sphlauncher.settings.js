(function (back) {
  var FILE = "sphlauncher.json";

  var settings = Object.assign({
    showClocks: true,
    showLaunchers: true,
    direct: false
  }, require('Storage').readJSON(FILE, true) || {});

  function writeSettings() {
    require('Storage').writeJSON(FILE, settings);
  }

  E.showMenu({
    "": { "title": "SPH Launcher" },
    "< Back": () => back(),
    'Show clocks': {
      value: settings.showClocks,
      onchange: v => {
        settings.showClocks = v;
        writeSettings();
      }
    },
    'Show launchers': {
      value: settings.showLaunchers,
      onchange: v => {
        settings.showLaunchers = v;
        writeSettings();
      }
    },
    'Direct launch': {
      value: settings.direct,
      onchange: v => {
        settings.direct = v;
        writeSettings();
      }
    }
  });
})
