---
title: "도커 중간 이미지 및 레이어"
description: ""
date:   2022-01-09
---

테스트 환경

- OS: centos/7

- Docker Version: 20.10.12

    > 호스트 OS 및 Docker Version 에 따라, 이 글의 `테스트 결과`가 다를 수 있습니다.

    - [Where is /var/lib/docker on Mac/OS X](https://stackoverflow.com/questions/38532483/where-is-var-lib-docker-on-mac-os-x)
    - [Mac 환경의 Docker 는 /var/lib/docker가 없다](https://memostack.tistory.com/3)

- 도커 `이미지` 및 `컨테이너`가 초기화되어있습니다.

## 간단한 Dockerfile 을 생성한다.

`FROM`, `RUN`, `COPY` 명령들이 포함된 `Dockerfile` 을 생성합니다.

```dockerfile
FROM alpine:latest
RUN echo first
COPY ./second.txt .
ADD ./third.txt .
CMD ["echo", "fourth"]
```

## 도커 이미지가 생성되는 과정

`docker build` 명령으로, `docker-layers:0.0.1` 이미지를 생성합니다.

- https://docs.docker.com/engine/reference/commandline/build/

```shell script
[root@docker-test docker-layer]# docker build -t docker-layers:0.0.1 .

Sending build context to Docker daemon  4.096kB
Step 1/5 : FROM alpine:latest
latest: Pulling from library/alpine

# 1번
59bf1c3509f3: Pull complete

# 2번
Digest: sha256:21a3deaa0d32a8057914f36584b5288d2e5ecc984380bc0118285c70fa8c9300
Status: Downloaded newer image for alpine:latest

# 3번
 ---> c059bfaa849c
Step 2/5 : RUN echo first

# 4번
 ---> Running in 80441f848a02

# 5번
first

# 6번
Removing intermediate container 80441f848a02

# 7번
 ---> c1ee277ee0b6
Step 3/5 : COPY ./second.txt .
 ---> 13b825a700e2
Step 4/5 : ADD ./third.txt .
 ---> 6b786cea2e12
Step 5/5 : CMD ["echo", "fourth"]
 ---> Running in a30a8b6dc7a0
Removing intermediate container a30a8b6dc7a0
 ---> 6533a93ed3e4

# 8번
Successfully built 6533a93ed3e4
Successfully tagged docker-layers:0.0.1
```

1. `59bf1c3509f3`: Pull complete 
    - `alpine:latest` 이미지의 `중간 이미지`입니다.
    
2. Digest: `sha256:21a3deaa0d32a8057914f36584b5288d2e5ecc984380bc0118285c70fa8c9300`

    - 원격 registry 에서 관리되는 `alpine:latest` 이미지의 `digest` 값입니다.

        > 이 값을 통해, 해당 이미지를 `pull` 할 수 있습니다.

        ```shell script
        docker pull alpine@sha256:21a3deaa0d32a8057914f36584b5288d2e5ecc984380bc0118285c70fa8c9300
        ```
      
      - https://docs.docker.com/engine/reference/commandline/pull/

      - 원격 registry 에서 가져온 이미지 아이디(`c059bfaa849c`)는 항상 같습니다. 그 이유는 빌드 시점에서 생성된 아이디를 갖기 때문입니다.

3. ---> `c059bfaa849c`

    - `alpine:latest` 이미지 아이디입니다.
 
4. ---> Running in `80441f848a02`

    - `RUN` 명령을 수행하기위해, 이전에 생성된 `alpine:latest` 이미지(`c059bfaa849c`)를 기준으로, 중간 컨테이너(`80441f848a02`)를 생성합니다.
    
5. first

    - 중간 컨테이너에서 `RUN` 명령을 수행한 결과입니다.

6. Removing intermediate container `80441f848a02`

    - 중간 컨테이너(`80441f848a02`)를 삭제합니다.

7.  ---> `c1ee277ee0b6`

    - `RUN` 명령이 수행된 중간 컨테이너(`80441f848a02`)를 기준으로, 중간 이미지(`c1ee277ee0b6`)를 생성합니다.

    - 이때 생성된 `중간 이미지`는 일종의 `스냅샷`과 유사합니다.

8. Successfully built `6533a93ed3e4`

    - 8번 이전까지 이 과정이 반복되며, 모든 과정이 끝나면, 생성된 `docker-layers:0.0.1` 이미지 아이디(`6533a93ed3e4`)가 출력됩니다.
        

## 중간 이미지 확인하기

`docker images` 명령으로 `중간 이미지`들을 확인할 수 있습니다.

- 이 경우, `13b825a700e2`, `6b786cea2e12`, `c1ee277ee0b6` hash 값이 `중간 이미지`에 해당됩니다.

- https://docs.docker.com/engine/reference/commandline/images/

<img src="https://user-images.githubusercontent.com/11391606/148420107-e89e0047-5f17-4f20-8481-f0bb5a69d129.png" width="700" />

```shell script
[root@docker-test docker-layer]# docker images -a

REPOSITORY      TAG       IMAGE ID       CREATED       SIZE
<none>          <none>    13b825a700e2   7 hours ago   5.59MB
<none>          <none>    6b786cea2e12   7 hours ago   5.59MB
docker-layers   0.0.1     6533a93ed3e4   7 hours ago   5.59MB
<none>          <none>    c1ee277ee0b6   7 hours ago   5.59MB
alpine          latest    c059bfaa849c   5 weeks ago   5.59MB
```

생성된 이미지 아이디들은, `imagedb` 디렉토리에서도 확인하실 수 있습니다.

```shell script
[root@docker-test ~]# ls /var/lib/docker/image/overlay2/imagedb/content/sha256

13b825a700e28b5643ec821757ec0a2b21f0531ec1bdbda6a33c2c8cd7afc4f9
6533a93ed3e44b5cd1a2b915508dfeb99b54660405a33db5fce4593884cb64db
6b786cea2e12553139d13f82ed9edbe3e30825b75b88d31f98eea758ed998e7f
c059bfaa849c4d8e4aecaeb3a10c2d9b3d85f5165c66ad3a4d937758128c4d18
c1ee277ee0b65261920b47bf211c74374706022a65dafc59d268ea17c31adfe5
```

> `imagedb` 경로에 포함된 `overlay2` 는 `storage driver` 이름이며, 이는 `docker info` 에서 확인할 수 있습니다.

- https://docs.docker.com/storage/storagedriver/overlayfs-driver/

```shell script
[root@docker-test docker-layer]# docker info

...
Server:
 ...
 Images: 5
 Server Version: 20.10.12
 Storage Driver: overlay2
...
```

- https://docs.docker.com/engine/reference/commandline/info/

## 이미지 레이어 확인하기

`docker image inspect` 명령으로, `이미지 레이어`들을 확인할 수 있습니다.

- https://docs.docker.com/engine/reference/commandline/image_inspect/

<img src="https://user-images.githubusercontent.com/11391606/148420106-91f804a1-d68f-436b-abf5-3c0affb11849.png" width="700" />

```shell script
[root@docker-test sha256]# docker image inspect 6533a93ed3e4

[
    {
        "Id": "sha256:6533a93ed3e44b5cd1a2b915508dfeb99b54660405a33db5fce4593884cb64db",
        ...
        "RootFS": {
            "Type": "layers",
            "Layers": [
                "sha256:8d3ac3489996423f53d6087c81180006263b79f206d3fdec9e66f0e27ceb8759",
                "sha256:49825ee4ae566cd81659e8a56f3d87266bcbf8e098d6dfa6ba75b53582fdb64a",
                "sha256:35654cdb06748b1ee3474cd39ce940377b6fa47b657ea6e8f93b1f55c3af94eb"
            ]
        },
    }
]
```

`RootFS.Layers` 에 포함된 hash 값들로, `이미지 레이어`들의 `데이터 디렉토리`를 찾을 수 있습니다.

> 데이터 디렉토리: 이미지 레이어의 데이터가 포함된 디렉토리

```shell script
[root@docker-test sha256]# ls /var/lib/docker/image/overlay2/layerdb/sha256

0c05e4dd4393920e9ae63e5c784f00084f12ab1414da5decaffb2da1275e1e0a
8d3ac3489996423f53d6087c81180006263b79f206d3fdec9e66f0e27ceb8759
c41ff8f7e1a31f45604ee0f6a1dbda09170df0a56c4054cb96fe81e3d344aa28
```

위 수행 결과에서, `RootFs.Layers` 에 포함된 hash 값(`8d3ac3489996...`)을 찾을 수 있으며, 
그 디렉토리안의 `cache-id` 파일 내용에서는, `데이터 디렉토리`를 가리키는 hash 값도 얻을 수 있습니다.

아래 명령으로, `데이터 디렉토리`를 가리키는 hash 값을 기억해둡니다.

```shell script
[root@docker-test sha256]# cat /var/lib/docker/image/overlay2/layerdb/sha256/8d3ac3489996423f53d6087c81180006263b79f206d3fdec9e66f0e27ceb8759/cache-id

d1988107ea10cdd0abd2f8b23dc78e616ef8e5b4c04ae0f81b9f7dd9efc54a15
```

그 다음, 모든 `데이터 디렉토리`가 존재하는 `/var/lib/docker/overlay2` 디렉토리로 이동한 후, 디렉토리 목록을 확인합니다.

```shell script
[root@docker-test ~]# ls /var/lib/docker/overlay2
253b78660d4ea67bfd01223dbf2f4b906b3ecf90dff35b21aced33b6c1890580
73a57325ec524749fd13bb0b4e40bb129632cb95b6b8ddd2df535ba35234d55b
73a57325ec524749fd13bb0b4e40bb129632cb95b6b8ddd2df535ba35234d55b-init
backingFsBlockDev
be6b4997511fbdb772a440a7c54fa0fae665261bec886412dffe82ddb3aa8f03
d1988107ea10cdd0abd2f8b23dc78e616ef8e5b4c04ae0f81b9f7dd9efc54a15
l
```

그럼 이전에 기억해둔 hash 값(`d1988107ea1...`)으로된 디렉토리를 확인할 수 있고,
그 디렉토리안의 `diff` 디렉토리에서, `alpine:latest` 이미지의 `데이터`들을 확인할 수 있었습니다.

```shell script
[root@docker-test ~]# ls /var/lib/docker/overlay2/d1988107ea10cdd0abd2f8b23dc78e616ef8e5b4c04ae0f81b9f7dd9efc54a15/diff

bin  dev  etc  home  lib  media  mnt  opt  proc  root  run  sbin  srv  sys tmp  usr  var
```

그러나, `8d3ac3489996...` hash 값을 제외한 나머지들은 일치하지 않았습니다.

```shell script
# RootFS.Layers

...
"Layers": [
    "sha256:8d3ac3489996423f53d6087c81180006263b79f206d3fdec9e66f0e27ceb8759",
    "sha256:49825ee4ae566cd81659e8a56f3d87266bcbf8e098d6dfa6ba75b53582fdb64a",
    "sha256:35654cdb06748b1ee3474cd39ce940377b6fa47b657ea6e8f93b1f55c3af94eb"
]
...

# /var/lib/docker/image/overlay2/layerdb/sha256

0c05e4dd4393920e9ae63e5c784f00084f12ab1414da5decaffb2da1275e1e0a
8d3ac3489996423f53d6087c81180006263b79f206d3fdec9e66f0e27ceb8759
c41ff8f7e1a31f45604ee0f6a1dbda09170df0a56c4054cb96fe81e3d344aa28
```

하지만 `0c05e4dd4393...`, `c41ff8f7e1a3...` 디렉토리안의 `cache-id` 내용으로, 
`/var/lib/docker/overlay2` 디렉토리에서, 관련 `데이터 디렉토리`들을 찾을 순 있었습니다.

## Union 파일 시스템

Union 파일 시스템이란? `여러 파일 시스템`들을 `하나의 파일 시스템`으로 합치는 시스템입니다.

도커에서는, 이미지에 포함된 `이미지 레이어`와, 컨테이너 생성 시, 추가되는 `컨테이너 레이어`를 Union 파일 시스템을 통해, `하나의 파일 시스템`으로 인식하도록 만듭니다.

> 컨테이너가 생성되면, 이미지에 포함된 모든 `이미지 레이어`들을 순차적으로 쌓은 후, 가장 위에 R/W 권한을 가진 `컨테이너 레이어`를 추가합니다.

<img src="https://user-images.githubusercontent.com/11391606/148420892-e75d615a-73c6-40cf-8f28-a27a4ebb5dd0.png" height="800" />

최종적으로, `이미지 레이어`들의 데이터와, `컨테이너 레이어`의 데이터가 `merged 레이어`에 병합되고, 컨테이너가 마운트됩니다.

> 만약 `이미지 레이어`와 `컨테이너 레이어`에 같은 데이터가 있을 경우, `컨테이너 레이어`의 데이터가 우선 순위를 갖습니다.

![https://media.vlpt.us/images/koo8624/post/ad688850-0c86-4e72-b4bd-c96f677e3c67/overlay_constructs.jpeg](https://media.vlpt.us/images/koo8624/post/ad688850-0c86-4e72-b4bd-c96f677e3c67/overlay_constructs.jpeg)

## 파일 시스템에서, `이미지 레이어`, `컨테이너 레이어`, `merged 레이어` 확인해보기

먼저 `docker run` 명령으로, `docker-layer:0.0.1` 이미지의 컨테이너를 생성합니다.

```shell script
[root@docker-test docker-layer]# docker images

REPOSITORY      TAG       IMAGE ID       CREATED       SIZE
docker-layers   0.0.1     6533a93ed3e4   9 hours ago   5.59MB
alpine          latest    c059bfaa849c   5 weeks ago   5.59MB

[root@docker-test docker-layer]# docker run -it 6533a93ed3e4 sh
```

https://docs.docker.com/engine/reference/commandline/run/

`docker ps` 명령으로, 생성된 컨테이너 아이디를 확인합니다.

- https://docs.docker.com/engine/reference/commandline/ps/

```shell script
[root@docker-test overlay2]# docker ps

CONTAINER ID   IMAGE          COMMAND   CREATED          STATUS          PORTS     NAMES
03fc5a96eb25   6533a93ed3e4   "sh"      43 seconds ago   Up 42 seconds             musing_cohen
```

`docker inspect` 명령으로, Union 파일 시스템의 `LowerDir`, `MergedDir`, `UpperDir` 에 해당하는 디렉토리들을 확인하실 수 있습니다.

- https://docs.docker.com/engine/reference/commandline/inspect/

```shell script
[root@docker-test overlay2]# docker inspect 03fc5a96eb25
[
    {
        "Id": "03fc5a96eb2566752e28c732fe0ddd66c66d4757f2de62dac816044e5a0fadc5",
        ...
        "GraphDriver": {
            "Data": {
                "LowerDir": "/var/lib/docker/overlay2/e4d3050e2b78095d94b0905d320368a6320bb87ab13772efb4491e046d4c298b-init/diff:/var/lib/docker/overlay2/253b78660d4ea67bfd01223dbf2f4b906b3ecf90dff35b21aced33b6c1890580/diff:/var/lib/docker/overlay2/be6b4997511fbdb772a440a7c54fa0fae665261bec886412dffe82ddb3aa8f03/diff:/var/lib/docker/overlay2/d1988107ea10cdd0abd2f8b23dc78e616ef8e5b4c04ae0f81b9f7dd9efc54a15/diff",
                "MergedDir": "/var/lib/docker/overlay2/e4d3050e2b78095d94b0905d320368a6320bb87ab13772efb4491e046d4c298b/merged",
                "UpperDir": "/var/lib/docker/overlay2/e4d3050e2b78095d94b0905d320368a6320bb87ab13772efb4491e046d4c298b/diff",
                "WorkDir": "/var/lib/docker/overlay2/e4d3050e2b78095d94b0905d320368a6320bb87ab13772efb4491e046d4c298b/work"
            },
            "Name": "overlay2"
        },
        ...
  }
]
```

`LowerDir` 은 `이미지 레이어`들의 `데이터 디렉토리`를 포함합니다.

- 이 중, `/var/lib/docker/overlay2/d1988107ea10.../diff` 디렉토리가 `alpine:latest` 이미지의 `데이터 디렉토리`를 가리키고있습니다.

```shell script
[root@docker-test ~]# ls /var/lib/docker/overlay2/d1988107ea10cdd0abd2f8b23dc78e616ef8e5b4c04ae0f81b9f7dd9efc54a15/diff

bin  dev  etc  home  lib  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
```

`MergedDir` 은 `merged 레이어`의 `데이터 디렉토리`를 포함합니다.

- `/var/lib/docker/overlay2/e4d3050e2b78.../merged` 디렉토리는 `merged 레이어`의 `데이터 디렉토리`를 가리키고있습니다.

```shell script
[root@docker-test ~]# ls /var/lib/docker/overlay2/e4d3050e2b78095d94b0905d320368a6320bb87ab13772efb4491e046d4c298b/merged

bin  etc   lib    mnt  proc  run   second.txt  sys       third.txt  usr
dev  home  media  opt  root  sbin  srv         tmp        var
```

`UpperDir` 은 `컨테이너 레이어`의 `데이터 디렉토리`를 포함합니다.

- `/var/lib/docker/overlay2/e4d3050e2b78.../diff` 디렉토리는 `컨테이너 레이어`의 `데이터 디렉토리`를 가리키고있습니다.

```shell script
[root@docker-test ~]# ls /var/lib/docker/overlay2/e4d3050e2b78095d94b0905d320368a6320bb87ab13772efb4491e046d4c298b/diff
```

## 이미지 레이어에, 임의의 파일을 추가한 후, 컨테이너 생성해보기

- `alpine:latest` 이미지의 `데이터 디렉토리`에 임의의 `test.txt` 파일을 추가한 후, 컨테이너를 생성하면, 
앞서 말한, `Union 파일 시스템 구조`로인해, `merged` 디렉토리에서, 추가된 `test.txt` 파일을 확인할 수 있습니다.

<img src="https://user-images.githubusercontent.com/11391606/148420886-f81693d4-6fd1-487c-bbe9-6788e5611473.png" height="800" />

기존 `merged` 디렉토리는, 다음과 같습니다.

> test.txt 파일이 존재하지않는다.

```shell script
[root@docker-test ~]# ls /var/lib/docker/overlay2/e4d3050e2b78095d94b0905d320368a6320bb87ab13772efb4491e046d4c298b/merged

bin  etc   lib    mnt  proc  run   second.txt  sys       third.txt  usr
dev  home  media  opt  root  sbin  srv         tmp        var
```

`alpine:latest` 이미지의 `데이터 디렉토리`에 `test.txt` 파일을 추가합니다.

```shell script
echo test > /var/lib/docker/overlay2/d1988107ea10cdd0abd2f8b23dc78e616ef8e5b4c04ae0f81b9f7dd9efc54a15/diff/test.txt
```

`docker-layers:0.0.1` 이미지로 컨테이너를 다시 생성합니다.

```shell script
docker run -it 6533a93ed3e4 sh
```

`docker ps` 명령으로 새로운 `컨테이너의 아이디`를 확인합니다.

```shell script
[root@docker-test overlay2]# docker ps

CONTAINER ID   IMAGE          COMMAND   CREATED         STATUS         PORTS     NAMES
e20f7b593716   6533a93ed3e4   "sh"      6 seconds ago   Up 5 seconds             inspiring_dhawan
```

`docker inspect` 명령으로, `merged 레이어`의 `데이터 디렉토리`를 확인합니다.

```shell script
[root@docker-test overlay2]# docker inspect e20f7b593716
[
    {
      ...
      "GraphDriver": {
          "Data": {
              "LowerDir": "/var/lib/docker/overlay2/020d8fd7aa9ec14fc8e6298631afc9a048372d43b23c54e17c93490eda0c22a3-init/diff:/var/lib/docker/overlay2/253b78660d4ea67bfd01223dbf2f4b906b3ecf90dff35b21aced33b6c1890580/diff:/var/lib/docker/overlay2/be6b4997511fbdb772a440a7c54fa0fae665261bec886412dffe82ddb3aa8f03/diff:/var/lib/docker/overlay2/d1988107ea10cdd0abd2f8b23dc78e616ef8e5b4c04ae0f81b9f7dd9efc54a15/diff",
              "MergedDir": "/var/lib/docker/overlay2/020d8fd7aa9ec14fc8e6298631afc9a048372d43b23c54e17c93490eda0c22a3/merged",
              "UpperDir": "/var/lib/docker/overlay2/020d8fd7aa9ec14fc8e6298631afc9a048372d43b23c54e17c93490eda0c22a3/diff",
              "WorkDir": "/var/lib/docker/overlay2/020d8fd7aa9ec14fc8e6298631afc9a048372d43b23c54e17c93490eda0c22a3/work"
          },
          "Name": "overlay2"
      },
      ...
    }
]
```

`merged` 디렉토리를 확인하면, `alpine:latest` 이미지 레이어에 추가된 `test.txt` 파일을 확인할 수 있습니다.

```shell script
[root@docker-test ~]# ls /var/lib/docker/overlay2/020d8fd7aa9ec14fc8e6298631afc9a048372d43b23c54e17c93490eda0c22a3/merged

bin  etc   lib    mnt  proc  run   second.txt  sys       third.txt  usr
dev  home  media  opt  root  sbin  srv         test.txt  tmp        var
```

## 추가된 merged 디렉토리는, 컨테이너 중지 시, 삭제됩니다.

`docker stop` 명령으로 `e20f7b593716` 컨테이너를 중지합니다.

- https://docs.docker.com/engine/reference/commandline/stop/
 
```shell script
[root@docker-test overlay2]# docker stop e20f7b593716 && ls /var/lib/docker/overlay2/020d8fd7aa9ec14fc8e6298631afc9a048372d43b23c54e17c93490eda0c22a3

e20f7b593716
diff  link  lower  work
```

> merged 디렉토리가 삭제되었습니다.

## 컨테이너가 삭제되면, 컨테이너 레이어 및 merged 디렉토리가 삭제됩니다.

`docker rm` 명령으로 `e20f7b593716` 컨테이너를 삭제합니다.

- https://docs.docker.com/engine/reference/commandline/rm

```shell script
[root@docker-test overlay2]# docker rm -f e20f7b593716 && ls /var/lib/docker/overlay2/020d8fd7aa9ec14fc8e6298631afc9a048372d43b23c54e17c93490eda0c22a3

e20f7b593716
ls: cannot access /var/lib/docker/overlay2/020d8fd7aa9ec14fc8e6298631afc9a048372d43b23c54e17c93490eda0c22a3: No such file or directory
```

```shell script
[root@docker-test overlay2]# ls /var/lib/docker/overlay2
253b78660d4ea67bfd01223dbf2f4b906b3ecf90dff35b21aced33b6c1890580
73a57325ec524749fd13bb0b4e40bb129632cb95b6b8ddd2df535ba35234d55b
73a57325ec524749fd13bb0b4e40bb129632cb95b6b8ddd2df535ba35234d55b-init
backingFsBlockDev
be6b4997511fbdb772a440a7c54fa0fae665261bec886412dffe82ddb3aa8f03
d1988107ea10cdd0abd2f8b23dc78e616ef8e5b4c04ae0f81b9f7dd9efc54a15
l
```

이전에 존재하던, `컨테이너 관련` 두 디렉토리가 삭제되었다.

```shell script
020d8fd7aa9ec14fc8e6298631afc9a048372d43b23c54e17c93490eda0c22a3
020d8fd7aa9ec14fc8e6298631afc9a048372d43b23c54e17c93490eda0c22a3-init
```

> 이중, 020d8fd7aa9e...-init 은 컨테이너를 초기화를 위한 레이어이다.




