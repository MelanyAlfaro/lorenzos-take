namespace Backend.Configuration
{
    public interface IStorageService
    {
        /// <summary>
        /// Upload and audio file and returns its permanent public URL
        /// </summary>
        /// <param name="fileStream"> The raw audio data stream </param>
        /// <param name="fileName"> A unique name for the file</param> 
        /// <param name="folder"> Cloudinary folder to organize files </param>
        
        Task<string> UploadAudioAsync(Stream fileStream, string fileName, string folder);

        /// <summary>
        /// Deletes an audio file from the storage service by its storage identifier.
        /// </summary>
        /// <param name="publicId"> The unique identifier of the audio file in the storage service. </param>
        Task DeleteAudioAsync(string publicId);
    }
}