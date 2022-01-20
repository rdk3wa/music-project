<?php

namespace App\Controller;

use App\Repository\AlbumRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class AlbumSearchController extends AbstractController
{

    protected AlbumRepository $albumRepository;

    public function __construct(AlbumRepository $albumRepository)
    {
        $this->albumRepository = $albumRepository;
    }

    public function __invoke(Request $request)
    {
        $q = $request->get('q');

        if (!$q) {
            throw new BadRequestHttpException("Vous devez fournir un paramètre 'q' pour votre recherche !");
        }

        $results = $this->albumRepository->searchWithQuery($q);

        return $results;
    }
}
