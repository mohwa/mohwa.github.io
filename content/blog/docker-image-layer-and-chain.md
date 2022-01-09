---
title: "도커 이미지 레이어 및 체인"
description: ""
date:   2022-01-09
---

이 글을 더 정확히 이해하기위해, [도커 중간 이미지 및 레이어](/docker-intermediate-image)를 먼저 읽어보시는것을 추천드립니다.

테스트 환경

- OS: centos/7

- Docker Version: 20.10.12

    > 호스트 OS 및 Docker Version 에 따라, 이 글의 `테스트 결과`가 다를 수 있습니다.

    - [Where is /var/lib/docker on Mac/OS X](https://stackoverflow.com/questions/38532483/where-is-var-lib-docker-on-mac-os-x)
    - [Mac 환경의 Docker 는 /var/lib/docker가 없다](https://memostack.tistory.com/3)

- 도커 `이미지` 및 `컨테이너`가 초기화되어있습니다.

- 아래 `Dockerfile` 내용으로, `docker-layers:0.0.1` 이미지가 생성된것을 전제로합니다.

```dockerfile
FROM alpine:latest
RUN echo first
COPY ./second.txt .
ADD ./third.txt .
CMD ["echo", "fourth"]
```

`docker history` 명령으로 `중간 이미지`들의 `사이즈`를 확인합니다.

- https://docs.docker.com/engine/reference/commandline/history/

```shell script
[root@docker-test docker-layer]# docker history 6533a93ed3e4

IMAGE          CREATED       CREATED BY                                      SIZE      COMMENT
6533a93ed3e4   2 hours ago   /bin/sh -c #(nop)  CMD ["echo" "fourth"]        0B
6b786cea2e12   2 hours ago   /bin/sh -c #(nop) ADD file:7db483be005ca26c6…   6B
13b825a700e2   2 hours ago   /bin/sh -c #(nop) COPY file:932d2d37c43b3d37…   7B
c1ee277ee0b6   2 hours ago   /bin/sh -c echo first                           0B
c059bfaa849c   5 weeks ago   /bin/sh -c #(nop)  CMD ["/bin/sh"]              0B
<missing>      5 weeks ago   /bin/sh -c #(nop) ADD file:9233f6f2237d79659…   5.59MB
```

`docker image inspect` 명령으로, `이미지 레이어`들을 확인하면, 사이즈가 `0B` 초과인 항목들만, `이미지 레이어`로 추가되어있는것을 확인할 수 있습니다.

- 즉, 컨테이너 `파일 시스템`에, 영향을 주는 항목들만, `이미지 레이어`로 추가됩니다.

https://docs.docker.com/engine/reference/commandline/image_inspect/

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

`layerdb` 에 포함된 디렉토리 목록입니다.

```shell script
[root@docker-test ~]# ls /var/lib/docker/image/overlay2/layerdb/sha256

0c05e4dd4393920e9ae63e5c784f00084f12ab1414da5decaffb2da1275e1e0a
8d3ac3489996423f53d6087c81180006263b79f206d3fdec9e66f0e27ceb8759
c41ff8f7e1a31f45604ee0f6a1dbda09170df0a56c4054cb96fe81e3d344aa28
```

## 도커 이미지 체인

<img src="https://user-images.githubusercontent.com/11391606/148420102-d5c8baf3-267b-40be-a2fa-84cc1e5b9f5b.png" height="800" />

생성된 모든 `이미지`들은, 모두 위와 같은 `부모/자식` 관계를 갖게됩니다.

즉, 다음과 같은 `이미지`들이 있을 경우,

> `/var/lib/docker/image/overlay2/imagedb/metadata/sha256` 에서 각 `이미지`들의 `parent`를 확인할 수 있습니다.

```shell script
[root@docker-test ~]# ls /var/lib/docker/image/overlay2/imagedb/metadata/sha256

13b825a700e28b5643ec821757ec0a2b21f0531ec1bdbda6a33c2c8cd7afc4f9
6533a93ed3e44b5cd1a2b915508dfeb99b54660405a33db5fce4593884cb64db
6b786cea2e12553139d13f82ed9edbe3e30825b75b88d31f98eea758ed998e7f
c059bfaa849c4d8e4aecaeb3a10c2d9b3d85f5165c66ad3a4d937758128c4d18
c1ee277ee0b65261920b47bf211c74374706022a65dafc59d268ea17c31adfe5
```

각 `이미지`들이 가리키는 `parent` 를 확인해보면 다음과 같습니다. 

`RUN echo first` 에 해당되는 이미지는, `alpine:latest` 이미지를 기반으로 생성되며, 그 이미지를 `parent` 로 바라보게됩니다.

```shell script
[root@docker-test sha256]# cat c1ee277ee0b65261920b47bf211c74374706022a65dafc59d268ea17c31adfe5/parent

# alpine:latest
sha256:c059bfaa849c4d8e4aecaeb3a10c2d9b3d85f5165c66ad3a4d937758128c4d18
```

또, `COPY ./second.txt .` 에 해당되는 이미지는, `RUN echo first` 이미지를 기반으로 생성되며, 그 이미지를 `parent` 로 바라보게됩니다.

```shell script
[root@docker-test sha256]# cat 13b825a700e28b5643ec821757ec0a2b21f0531ec1bdbda6a33c2c8cd7afc4f9/parent

# RUN echo first
sha256:c1ee277ee0b65261920b47bf211c74374706022a65dafc59d268ea17c31adfe5
```

즉, 모든 이미지들은, 모두 위와 같은 `부모/자식` 관계를 갖게되고, 이런 구조를 기반으로, `레이어 체인`이 만들어지게됩니다.