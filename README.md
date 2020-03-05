# Node.js-restAPI
> **A node.js API server** - It provides RESTful API services for creating an account and uploading documents as well as redeeming license keys for the said uploaded document 

- RESTful
- API Authentication(JWT)
- Hotswap MongoDB
- Easy to setup


## Configuration
> **Note: this file is located under /model/api_config.js**

```javascript
const password = 'N*-R7k+stNAUQ%Ks3?LY3K$5V+te@xkEra&RawDeu@aW#yW*CVuC@t3S*E8@%gam*hPA?rDUw+KzGJn&=&#uXamLbEDg&7#wB2shN8v#=P+&7^j#G5^#Z3RcR*s%2&u4+_R!fQMRV2YmfSc@B-Y_MWDGaUteZ&ptk3-Bx8E&7CYK_9x#f$@jcnM7RjEsZwu8pS!wfC#+ypWGyqtXG3cKPSy=swHC#nh?LK^TFWD3m=HJ6DwpdrPAn5uzNM!7%7Gxp+&*KMchGgCbD^rs6xq_wSGCJ%6RfMphH-TR8pLeCkNN+WBKa=K!*SF+FeaB5NG=45!37Ux$8H*PFYhhQk92D^mg2H?cH8NWem@s@aNjCz^&JRvALLYyvUkBufdcw$u52BZM%m7kY5MnT&Av=3WmD@&JMPhvFu6RhL582!t#+dreNMth4bgMj9AWRkM&V#gm?tc5PmF=r$UHmzyvVsGutnBgAyybQbQqYcH@3eMt35YXXx-_3PHm^pW_2raSTbDd$B4%GmJ3CRept!NktGgy%8WArhnjQkAHLDU-NV94s5ntBp2GJrR+8XLHfyFY9F=+uUWeqC_$edXKfb$XqXc@2hsWePLD537_t*D$2$2w#RMut&d93Y#N3hvj5+hJ88&8khjPbHNfqBeJ5?J5r9*hRgY*vLrNaTDSyjg-vdb3gu@pHSj2UpvU2#U*SqJCUTFjANAWHu_XuVE2yMsZ5D+D%q%-Ntw7tyC8j*a#LCFWKg3&rbYtJ5tWnRe#RC?RW=C+=7XCGm*SaypNGBnTV+w-5xsL+Tk-v2$bUR+Pvftsm-%WQbE?!a#Yp%N&!ja$$EvKUbqcrfmCYRYtk2q9+zWkxSFkJ=WdjYD5pER9At*Tne#X@m^wFzY3cVxnh6&nXYzfkjDrpjjJSh9J?5#MH^PDs+SPvMv%u2+67u$AQcn#ZKtjfyYc?-2Xb8FXM$YP29-PxcTaw?wWyS2HkbTa_vKF&K7ZTHnzyz_pqJFY^jpd7zz^pjhMzM%2kh3pfuHeaBP$VdQZ#QUbrF@SG&7wpABeNe2?%Qv@dqg%j%Tm@jrdeZ=8R*SsBZm3uwe^e*Lb4ns6My+_KeGWzvyqtfdq7HbJzuE4Neq-4QQabyKZ?pr7CJP=*k@j?KE7txg^qhN*BapYZX=QpM_SaGn7^zF_!$m-+4+3sR$nK46LEFU_c699SRd48!dW_mt2$?uqRxKBFD-$Pwqs8hW^SR^N-%=2LGZjGudE?!AX?EZjtsL=rrMsJ=WLW-J=B$-dCn9VNYPvtt38ENve_^WabA%Ex7Z^=s%54Y5EPucZHJ4v=RXfjJ=w7@LP3&2TP4V8*suzAy-GPm!MPqBWL!k*s7GNzUvL52VW5L-G&@D%$=NE@CtB*K7#xEy7y$%DEsMf35BD%_!W!a64GSYZNcW9gw!n#@VdF7PkX9d3@=ZrG*_BYbsr2gVJBa#qfGRdUjs+LF_^a*PgC7xcxe-6A-qZ-hk8xABUZxpf*@aQU#*j@%yv7rTP2EZ&?smrQC?bW&XD6m6^r88F@FMeYRhFxGa8CBhQBQfX@%NX&Ca&5a5ASmqUrCMm4DtCw+dDMvbU2w&QB=UuEvfeWjfGFm5JLGg2snHZxwATQUxMPdj22z@6W7Q*qJ2uehxZr7+zvY#nVxftFEVj8JKJr=AxQcUxUyMecTPJL#!EF*+z--h$9!NJAZr9qyaUtJ2J47q&k#6d&j+XMGQVd$_zNnc&RTa7BMavjLT*c*uA&r+AXGs&vwx^bgs_L=RJ872tJfeMF@4^a834dSsxspae6Y=4mQTqKnVJH74BSuThYY=UBdh3#Jf+kb^6ZGay-f&jcea5Mc2WYccZ@T=?fgD?zaQWrr&8UKr9&-HyUN+^Uk!jyNM*=zdQJ?4H9ahUF9fA9*4gpD$Ss=56jwQRHj!w_u*+TvGEvTvG2R=kV@U%_h5%Qy2baQ9$xJV9NzPJ8s&Wc3QCUzvnpvCYN2JruHZa&$%6v$@*CJ?@Z=UMJ_RFqQ*RQqnewmdGYB!ATDLn7@^aLvy%jVL_caxk?SZg-q^t$mrp'
const SALT_ROUNDS = 10;
const TOKEN_SECRET = "kjdfnajsdfksjnfijq3fjnasdmdvoawnefonqwrfjmlksdmdfoiniawnf";
const DB = "mongodb://localhost:27017/darpa_069"
const ALLOWED_DOCUMENTS = ['pdf','docx']
const ALLOWED_IMAGES = ['jpg','jpeg','png','bmp']
//2048 bit password
module.exports = {'password':password,'SALT_ROUNDS':SALT_ROUNDS,'TOKEN_SECRET':TOKEN_SECRET,'DB':DB,'ALLOWED_DOCUMENTS':ALLOWED_DOCUMENTS,'ALLOWED_IMAGES':ALLOWED_IMAGES}



```
- `TOKEN_SECRET` is a one time secret that is used to sign and verify JWT(JSON WEB TOKENS)
- `DB` can either be a local mongoDB server or can also be configured to MongoAtlas over the cloud
- `ALLOWED_DOCUMENTS` this specifies the kind of that is allowed to be uploaded(this is verfied by MIME type)
- `ALLOWED_IMAGES` this specifies the kind of image that can be uploaded


## Project Structure

>  A  top-level directory layout
>  This project is based on MVC(Model,View,Controller)

    .
    ├── model                     # This part of the project holds the structure of various modules as well as DB
    ├── module                    # This holds the business logic of the server
    ├── routes                    # holds private as well as public routes
    ├── uploads                   # All uploaded docuemnts are stored here
    ├── index.js
    ├── README.md                   
    ├── server.cert               # Self signed SSL certificate that is provided to the client
    └── server.key                # The key used to verify the SSL certificate
