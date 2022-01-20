<?php

namespace App\Service\Upload;

use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class UploadManager
{
    /** string $rootPath */
    private $rootPath;

    public function __construct(string $rootPath)
    {
        $this->rootPath = $rootPath;
    }

    /**
     * @param UploadedFile $file
     * @param string $dir
     * @return string
     */
    public function upload(UploadedFile $file, string $dir): string
    {
        $originalFilename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $fileName = $originalFilename.".".$file->guessExtension();
        $uploadDir = $this->getFilePath($this->rootPath."../frontend/src/assets/".$dir);
        $path = $dir."/".$fileName;

        try {
            $file->move(
                $uploadDir,
                $fileName
            );
        } catch (FileException $e) {
            // ... handle exception if something happens during file upload
        }

        return $path;
    }

    private function getFilePath($dir)
    {
        mkdir($dir, 0700);

        return $dir;
    }
}
