# Hosting

## Overview

Hosting lets you store the files in Syncano and make them accessible via custom domains. In order to publish your website or application you just have to create a Hosting in Syncano and upload the files there. Your domains will link to a default page explaining how to use CLI as a main tool to manage your application's backend. To set up your page you don't have to do anything more but upload an index file. Then the domain will be leading to your page.

## Hosting Configuration

Managing your hosting is straightforward:

To add a folder with your static website files, run:

```
npx s hosting add <local-folder-to-host>
```

If you answer `yes` when prompted about syncing the files, they will be hosted for you instantly and available under the url matching the following schema:

`https://<hosting_name>--<instance_name>.syncano.site`

## CLI Commands

- `s hosting add`
- `s hosting config`
- `s hosting sync`
- `s hosting files`
- `s hosting delete`

### add
```sh
npx syncano-cli hosting add [hosting_path]
```
Later, you will be asked to provide some info:
* Please choose for which socket you want to list hostings
* Please name this hosting
* Please choose directory of your files **(this one appears if you don't specify [hosting_path])**
* Do you want to set CNAME now (your own domain) or should it be empty?

After proceeding with these prompts, hosting will be added to your configuration in `syncano.yml` hosting section. You have to `deploy` configuration after that operation.

### config

Thanks to the `config` command you can configure CNAME for the given hosting:
```sh
npx syncano-cli config <hosting_name> --cname <your_domain>
```

### sync
To synchronize all the hosting files execute:
```sh
npx syncano-cli hosting sync
```
After running this command all the hosting files will be uploaded to the server. You can find all of them in URL printed after successful synchronization.

Example:
```
    Syncing hosting files for staging
    https://<hosting_name>--<instance_name>.syncano.site

      ✓ File added:   index.html

    1 files synchronized, 339 B in total
    staging is available at: https://<hosting_name>--<instance_name>.syncano.site
```


!> Files which are not available locally anymore will be also deleted from the server.

#### Synchronizing files of specific Hosting
```sh
npx syncano-cli hosting sync <hosting-name>
```

### list
To list Hosting configuration:
```sh
npx syncano-cli hosting list
npx syncano-cli hosting list <hosting-name>
```

Example response:
```
    Your Hosting containers:

    name: hello
    url: https://<hosting_name>--<instance_name>.syncano.site
```

### list files
```sh
npx syncano-cli hosting files <hosting-name>
```
Example response:
```
    Hosting staging has 3 files:

    path                                          size     uploaded      up to date
    index.html                                    29 B            ✓              ✓
    js/index.js                                  364 B            ✓              ✓

    You have 2 files, 394 B in total.
```

### delete
To delete Hosting configuration:
```sh
npx syncano-cli hosting delete <hosting-name>
```
!> After that your Hosting will be deleted from the configuration but folder with files will still be available in your local directory.
Hosting will be removed from your backend during the next `npx s deploy`.
