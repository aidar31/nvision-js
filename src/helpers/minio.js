import * as Minio from 'minio'


const minioClient = new Minio.Client({
    endPoint: 'play.min.io',
    port: 9000,
    useSSL: true,
    accessKey: 'aWgy8nmKctx8H0TKhPIm',
    secretKey: '35uPQcH0RRtR2pljr7kN49V32WD1dEcxcwo2vB2N',
});

export default minioClient;
