The purpose of this preprocessor is to take a directory full of JSON
files to be used as fixtures and package them into an angular module
that can load them.

# Configuration

1. Create an empty placeholder file inside of the directory that holds your JSON files.
1. Add this placeholder file to the files list in your `karma.conf.js` file

        files: [
            ...
            'your/file/name.js',
            ...
        ]


1. Add this file to the preprocessor section of the `karma.conf.js` file.

        preprocessors: {
          'your/file/name.js': ['jsonDirToJs']
        }


1. Add the configuration section

        jsonDirToJs: {
          'your/file/name.js': {
            moduleName: 'name.of.new.angular.module',
            dir: 'your/file',
            objectName: 'JsObjFilesWillResideIn'
          }
        }


# Using it

Using the configuration from above steps. The JSON files will be
loaded into an object named, `JsObjFilesWillResideIn`. Each property
in the object is the name of the filename without the `.json`
extension.

Take care to name your files sensibly so you can use `.` accessors on
the object.

For example, with an object name of `RemoteMocks` and a file name of
`UserListApi.json` you will be able to access the contents like,
`RemoteMocks.UserListApi` in your code.


# Example usage in your tests

       var MockResponses,
           MockUserListApi;

       beforeEach(function () {
         module('name.of.new.angular.module');
       });

       inject(function($injector){
         MockResponses = $injector.get('JsObjFilesWillResideIn');
         MockUserListApi = MockResponses.UserListApi;
       });

# Updating your Mocks

If you want to update your JSON files in the directory, you need to
`touch your/file/name.js` or restart your grunt task to pick up the
changes.
