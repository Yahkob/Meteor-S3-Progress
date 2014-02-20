Package.describe({
  summary: "A full featured helper for easily uploading files to Amazon S3 from your Meteor application."
});

var both = ["client", "server"];

Npm.depends({
  knox: "0.8.5",
  "stream-buffers": "0.2.5",
  "color-util-logs": "0.0.1",
  "should": "3.1.2"
});

Package.on_test(function(api){
  api.use([
    "tinytest",
    "underscore",
    "handlebars",
    "templating",
    "collection-hooks",
    "momentjs",
    "accounts-base",
    "coffeescript",
    "roles",
    "bootboxjs",
    "router",
    "deps"
    ], both);
  api.add_files([
    "tests/tests.js",
    "collection/s3config.js",
    "collection/s3files.js"
    ], both);
});

Package.on_use(function (api) {
  //Need service-configuration to use Meteor.method
  api.use([
    "underscore",
    "handlebars",
    "templating",
    "collection-hooks",
    "momentjs",
    "accounts-base",
    "coffeescript",
    "roles",
    "bootboxjs",
    "router",
    "deps"
    ], ["client", "server"]);
  api.use(["handlebars-server"], "server");

  // Collections shared by both client and server.
  api.add_files([
    "lib/files.js",
    "collection/s3config.js",
    "collection/s3files.js"
    ],both);
  api.add_files([
    "client/common/common.html",
    "client/common/common.js",
    "client/views/s3admin/admin.html",
    "client/views/s3admin/admin.js",
    "client/views/s3upload/upload.html",
    "client/views/s3upload/upload.js",
    "client/views/s3user/user.html",
    "client/views/s3user/user.js",
    "s3.css"
    ], "client");
  api.add_files([
    "client/common/cors_configuration.handlebars",
    "client/common/bucket_policy_configuration.handlebars",
    "server/s3server.js",
    "server/s3_user_hooks.js",
    "server/routes.js"
    ], "server");



  // Allows user access to Knox
  if(api.export) {
    api.export("Knox","server");
    api.export(["S3files","S3config", "S3"],["client", "server"]);
  }
});
