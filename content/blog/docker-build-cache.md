---
title: "도커 빌드 캐시"
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

## 먼저, Dockerfile 생성합니다.

```dockerfile
FROM alpine:latest
RUN echo first
COPY ./second.txt .
ADD ./third.txt .
CMD ["echo", "fourth"]
```

## 첫 번째 이미지를 생성한 경우

우선 생성된 모든 `이미지`들이 저장되는 공간을 확인해보면, 모두 비어있는것을 확인할 수 있습니다.

```shell script
[root@docker-test docker]# ls /var/lib/docker/image/overlay2/imagedb/content/sha256
```

`docker build` 명령으로, `docker-layers:0.0.1` 이미지를 생성합니다.

```shell script
[root@docker-test docker-layer]# docker build -t docker-layers:0.0.1 .

Sending build context to Docker daemon  4.096kB
Step 1/5 : FROM alpine:latest
latest: Pulling from library/alpine
59bf1c3509f3: Pull complete
Digest: sha256:21a3deaa0d32a8057914f36584b5288d2e5ecc984380bc0118285c70fa8c9300
Status: Downloaded newer image for alpine:latest
 ---> c059bfaa849c
Step 2/5 : RUN echo first
 ---> Running in 24aaa5617f83
first
Removing intermediate container 24aaa5617f83
 ---> 3a18fe3979f0
Step 3/5 : COPY ./second.txt .
 ---> 6da5ddb808b7
Step 4/5 : ADD ./third.txt .
 ---> a537bad7aa2b
Step 5/5 : CMD ["echo", "fourth"]
 ---> Running in da1be8fb3579
Removing intermediate container da1be8fb3579
 ---> 17be1d9b9c5e
Successfully built 17be1d9b9c5e
Successfully tagged docker-layers:0.0.1
```

<img src="https://user-images.githubusercontent.com/11391606/148420099-ad4170e4-2f5d-4aa1-a2b5-9244a1a0e767.png" height="800" />

> 캐시된 `이미지`들이 존재하지않는것을, 한번 더 확인할 수 있습니다.

이제 `docker-layers:0.0.1` 의 `이미지`들이 생성된것을 확인할 수 있습니다.

```shell script
[root@docker-test docker]# ls /var/lib/docker/image/overlay2/imagedb/content/sha256

c059bfaa849c4d8e4aecaeb3a10c2d9b3d85f5165c66ad3a4d937758128c4d18
3a18fe3979f0ba52526965cfa3fbfa44e9cb1a01fac9d8df3f8dea9a5b5cc895
6da5ddb808b77a5e7f64bf7c134bdce69e1eb67c1c4afe4f8d0a4a0d1edfb1c2
a537bad7aa2b21ea19666a67cc8ee66ffa151128ed07f20c17f1584e595ff9ca
17be1d9b9c5ea8e703fabf23c45c374e79486f272aa552247b7e9cd6a5e97af5
```

## 두번째 이미지를 생성한 경우

먼저 `/var/lib/docker/image/overlay2/imagedb/content/sha256` 디렉토리를 확인해보면, 이전 `docker-layers:0.0.1` 이미지로부터 
생성된 `이미지`들을 확인할 수 있습니다.

```shell script
[root@docker-test docker]# ls /var/lib/docker/image/overlay2/imagedb/content/sha256

c059bfaa849c4d8e4aecaeb3a10c2d9b3d85f5165c66ad3a4d937758128c4d18
3a18fe3979f0ba52526965cfa3fbfa44e9cb1a01fac9d8df3f8dea9a5b5cc895
6da5ddb808b77a5e7f64bf7c134bdce69e1eb67c1c4afe4f8d0a4a0d1edfb1c2
a537bad7aa2b21ea19666a67cc8ee66ffa151128ed07f20c17f1584e595ff9ca
17be1d9b9c5ea8e703fabf23c45c374e79486f272aa552247b7e9cd6a5e97af5
```

`docker build` 명령으로, `docker-layer:0.0.2` 이미지를 생성합니다.

```shell script
[root@docker-test docker-layer]# docker build -t docker-layers:0.0.2 .

Sending build context to Docker daemon  4.096kB
Step 1/5 : FROM alpine:latest
 ---> c059bfaa849c
Step 2/5 : RUN echo first
 ---> Using cache
 ---> 3a18fe3979f0
Step 3/5 : COPY ./second.txt .
 ---> Using cache
 ---> 6da5ddb808b7
Step 4/5 : ADD ./third.txt .
 ---> Using cache
 ---> a537bad7aa2b
Step 5/5 : CMD ["echo", "fourth"]
 ---> Using cache
 ---> 17be1d9b9c5e
Successfully built 17be1d9b9c5e
Successfully tagged docker-layers:0.0.2
```

<img src="https://user-images.githubusercontent.com/11391606/148420069-71291d1d-0d57-4b1f-bca2-ca9e4f2a99ec.png" height="800" />

> `docker-layers:0.0.1` 로 부터 캐시된 `이미지`들이, `재 활용`된것을 확인할 수 있습니다.

## `Dockerfile` 내용을 변경한 후, 이미지를 생성한 경우

`/var/lib/docker/image/overlay2/imagedb/content/sha256` 디렉토리를 확인합니다.

```shell script
[root@docker-test sha256]# ls /var/lib/docker/image/overlay2/imagedb/content/sha256

c059bfaa849c4d8e4aecaeb3a10c2d9b3d85f5165c66ad3a4d937758128c4d18
3a18fe3979f0ba52526965cfa3fbfa44e9cb1a01fac9d8df3f8dea9a5b5cc895
6da5ddb808b77a5e7f64bf7c134bdce69e1eb67c1c4afe4f8d0a4a0d1edfb1c2
a537bad7aa2b21ea19666a67cc8ee66ffa151128ed07f20c17f1584e595ff9ca
17be1d9b9c5ea8e703fabf23c45c374e79486f272aa552247b7e9cd6a5e97af5
```

기존 `Dockerfile` 내용을 일부 수정합니다.

> 기존 `이미지 체인`에 변화를 주기위해, 컨테이너 `파일 시스템`에 영향을 주는 새로운 `COPY` 명령(`COPY ./new_second.txt .`)을 추가합니다.
 
```dockerfile
FROM alpine:latest
RUN echo first
COPY ./second.txt .
COPY ./new_second.txt .
ADD ./third.txt .
CMD ["echo", "fourth"]
```

위 `Dockerfile` 에서 COPY 될 `new_second.txt` 파일을 생성합니다.

```shell script
[root@docker-test docker-layer]# echo new_second > new_second.txt && ls

Dockerfile  new_second.txt  second.txt  third.txt
```

`docker build` 명령으로, `docker-layers:0.0.3` 이미지를 생성합니다.

```shell script
[root@docker-test docker-layer]# docker build -t docker-layers:0.0.3 .

Sending build context to Docker daemon   5.12kB
Step 1/6 : FROM alpine:latest
 ---> c059bfaa849c
Step 2/6 : RUN echo first
 ---> Using cache
 ---> 3a18fe3979f0
Step 3/6 : COPY ./second.txt .
 ---> Using cache
 ---> 6da5ddb808b7
Step 4/6 : COPY ./new_second.txt .
 ---> c3f400b3c3b4
Step 5/6 : ADD ./third.txt .
 ---> b089e6d887fe
Step 6/6 : CMD ["echo", "fourth"]
 ---> Running in 25d40b3f392a
Removing intermediate container 25d40b3f392a
 ---> 2e50e1c93943
Successfully built 2e50e1c93943
Successfully tagged docker-layers:0.0.3
```

<img src="https://user-images.githubusercontent.com/11391606/148420089-aaebece2-e80f-4046-982b-a7230009c3da.png" height="800" />

> 일부 이미지(`c059bfaa849c` ~ `6da5ddb808b7`)들만 `재 활용`되었고, 추가된 `COPY` 명령과, 
그 뒤의 모든 명령들이 새로운 `이미지`로 추가되었습니다.

다시 `/var/lib/docker/image/overlay2/imagedb/content/sha256` 디렉토리를 확인합니다.

```shell script
[root@docker-test ~]# ls /var/lib/docker/image/overlay2/imagedb/content/sha256

c059bfaa849c4d8e4aecaeb3a10c2d9b3d85f5165c66ad3a4d937758128c4d18
3a18fe3979f0ba52526965cfa3fbfa44e9cb1a01fac9d8df3f8dea9a5b5cc895
6da5ddb808b77a5e7f64bf7c134bdce69e1eb67c1c4afe4f8d0a4a0d1edfb1c2
c3f400b3c3b4a725e4bf150ce314a3ba006fb622ea3de26c04a5697dd3184327
b089e6d887fe05bada5545875ec3d97d55f5b41c4cba260a9c64b66fa30cddf8
2e50e1c939430406a23641225d384c1da7b9b7699f3a08b02596d4214ed1cd3d
a537bad7aa2b21ea19666a67cc8ee66ffa151128ed07f20c17f1584e595ff9ca
17be1d9b9c5ea8e703fabf23c45c374e79486f272aa552247b7e9cd6a5e97af5
```

이전 `이미지` 목록에,

```shell script
c059bfaa849c4d8e4aecaeb3a10c2d9b3d85f5165c66ad3a4d937758128c4d18
3a18fe3979f0ba52526965cfa3fbfa44e9cb1a01fac9d8df3f8dea9a5b5cc895
6da5ddb808b77a5e7f64bf7c134bdce69e1eb67c1c4afe4f8d0a4a0d1edfb1c2
a537bad7aa2b21ea19666a67cc8ee66ffa151128ed07f20c17f1584e595ff9ca
17be1d9b9c5ea8e703fabf23c45c374e79486f272aa552247b7e9cd6a5e97af5
```

새로운 `이미지`들이 더해진것을 확인할 수 있습니다.

```shell script
c3f400b3c3b4a725e4bf150ce314a3ba006fb622ea3de26c04a5697dd3184327
b089e6d887fe05bada5545875ec3d97d55f5b41c4cba260a9c64b66fa30cddf8
2e50e1c939430406a23641225d384c1da7b9b7699f3a08b02596d4214ed1cd3d
```

## 캐시된 이미지가 무효화된 이유

<img src="https://user-images.githubusercontent.com/11391606/148420089-aaebece2-e80f-4046-982b-a7230009c3da.png" height="800" />

[이미지 레이어 체인]()의 `부모/자식` 관계로인해, 
추가된 이미지(`new_second.txt`) 이후의 이미지들이 바라보던 `parent` 의 변경과함께, 
새로운 이미지들이 추가되었고, 그로인해, 이전에 캐시된 이미지들을 사용할 수 없게된 것이다.

> 즉, 변경된 `명령` 이후의 `모든 명령`들은, 캐시된 `이미지`를 사용하지않고, 새로운 `이미지`를 만들어냅니다.

변경전 `Dockerfile`

```dockerfile
FROM alpine:latest
RUN echo first
COPY ./second.txt .
ADD ./third.txt .
CMD ["echo", "fourth"] 
```

<img src="https://user-images.githubusercontent.com/11391606/148461729-44228c21-9209-4ac8-a30c-46b7facff7c7.png" height="800" />

변경 후 `Dockerfile`

```dockerfile
FROM alpine:latest
RUN echo first
COPY ./second.txt .
COPY ./new_second.txt .
ADD ./third.txt .
CMD ["echo", "fourth"]
```

<img src="https://user-images.githubusercontent.com/11391606/148420094-f817a05e-8d11-48d2-8ce2-04d90823ba0e.png" height="800" />

`/var/lib/docker/image/overlay2/imagedb/metadata/sha256` 목록입니다.

```shell script
[root@docker-test sha256]# ls /var/lib/docker/image/overlay2/imagedb/metadata/sha256

# 기존 CMD ["echo", "fourth"] 명령
17be1d9b9c5ea8e703fabf23c45c374e79486f272aa552247b7e9cd6a5e97af5

# 새로운 CMD ["echo", "fourth"] 명령
2e50e1c939430406a23641225d384c1da7b9b7699f3a08b02596d4214ed1cd3d

# 기존 RUN echo first 명령
3a18fe3979f0ba52526965cfa3fbfa44e9cb1a01fac9d8df3f8dea9a5b5cc895

# 기존 COPY ./second.txt . 명령
6da5ddb808b77a5e7f64bf7c134bdce69e1eb67c1c4afe4f8d0a4a0d1edfb1c2

# 기존 ADD ./third.txt . 명령
a537bad7aa2b21ea19666a67cc8ee66ffa151128ed07f20c17f1584e595ff9ca

# 새로운 ADD ./third.txt . 명령
b089e6d887fe05bada5545875ec3d97d55f5b41c4cba260a9c64b66fa30cddf8

# 새로운 COPY ./new_second.txt . 명령
c3f400b3c3b4a725e4bf150ce314a3ba006fb622ea3de26c04a5697dd3184327
```