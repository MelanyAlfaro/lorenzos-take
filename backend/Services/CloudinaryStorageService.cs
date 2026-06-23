using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using backend.Configuration;
using Microsoft.Extensions.Options;

namespace backend.Services;

/// <summary>
/// Implementation of IStorageService that uses Cloudinary for audio file storage.
/// </summary>
public class CloudinaryStorageService : IStorageService
{
    // Cloudinary client instance for interacting with the Cloudinary API.
    private readonly Cloudinary _cloudinary;

    // Constructor that initializes the Cloudinary client using settings from configuration. Dependency injection is used to provide the CloudinarySettings.
    public CloudinaryStorageService(IOptions<CloudinarySettings> settings)
    { 
        // Retrieve the Cloudinary settings from the injected IOptions<CloudinarySettings> and create a Cloudinary account instance.
        var s = settings.Value;
        var account = new Account(s.CloudName, s.ApiKey, s.ApiSecret);
        _cloudinary = new Cloudinary(account) { Api = { Secure = true } };
    }

  /// <summary>
  /// Uploads an audio file to Cloudinary and returns its permanent public URL. 
  /// </summary>
  /// <param name="fileStream">The raw audio data stream.</param>
  /// <param name="fileName">A unique name for the file.</param>
  /// <param name="folder">Cloudinary folder to organize files.</param>
    public async Task<string> UploadAudioAsync(Stream fileStream, string fileName, string folder)
    {
        // Create upload parameters for the Cloudinary upload, specifying the file, public ID (which includes the folder), and overwrite behavior.
        var uploadParams = new RawUploadParams
        {
            File = new FileDescription(fileName, fileStream),
            PublicId = $"{folder}/{fileName}",
            Overwrite = false
        };

        // Perform the upload to Cloudinary and check for errors. If successful, return the secure URL of the uploaded audio file.
        var result = await _cloudinary.UploadAsync(uploadParams);

        // If the upload fails, throw an exception with the error message from Cloudinary.
        if (result.Error is not null)
            throw new Exception($"Cloudinary upload failed: {result.Error.Message}");

        // Return the secure URL of the uploaded audio file.
        return result.SecureUrl.ToString();
    }

    /// <summary>
    ///  Deletes an audio file from Cloudinary using its public identifier. This is useful for removing files that are no longer needed or were uploaded in error.
    /// </summary>
    /// <param name="publicId"> The id that represents the audio file</param>
    /// <returns> A Task that represents the deletion of the audio file</returns>
    public async Task DeleteAudioAsync(string publicId)
    {
        var deleteParams = new DeletionParams(publicId);
        await _cloudinary.DestroyAsync(deleteParams);
    }
}