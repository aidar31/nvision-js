import minioClient from "../helpers/minio.js";



class MinioRepository {
    static async createBucket(bucketName) {
        const bucket = minioClient.makeBucket(
            bucketName, (error) => {
                console.log("Bucket not created ", error);
            }
        );
        return bucket;
    }
}


MinioRepository.createBucket("test");


