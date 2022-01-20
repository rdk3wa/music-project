<?php

namespace App\Controller;

use App\Entity\Music;
use App\Service\FileUploader;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

#[AsController]
final class MusicPostController extends AbstractController
{
    public function __invoke(Request $request, FileUploader $fileUploader): Music
    {
        $uploadedFile = $request->files->get('file');
        if (!$uploadedFile) {
            throw new BadRequestHttpException('"file" is required');
        }

        $music = new Music();
        $music->setTitle($request->get('title'))
            ->setDuration($request->get('year'))
            ->setDuration($request->get('duration'))
            ->setAlbum($request->get('album'))
            ->setType($request->get('type'))
            ->setFile($fileUploader->upload($uploadedFile))
        ;

        return $music;
    }
}
