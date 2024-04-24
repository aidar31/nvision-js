import minio from "minio";



const minioClient = new minio.Client({
    endPoint: "localhost",
    port: 9000,
    useSSL: false,
    accessKey: "nvisionsuper",
    secretKey: "nvisionsuper",
});

