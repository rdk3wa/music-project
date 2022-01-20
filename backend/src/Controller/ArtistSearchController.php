<?php

namespace App\Controller;

use App\Repository\ArtistRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class ArtistSearchController extends AbstractController
{

    protected ArtistRepository $artistRepository;

    public function __construct(ArtistRepository $artistRepository)
    {
        $this->artistRepository = $artistRepository;
    }

    public function __invoke(Request $request)
    {
        $q = $request->get('q');

        if (!$q) {
            throw new BadRequestHttpException("Vous devez fournir un paramètre 'q' pour votre recherche !");
        }

        $results = $this->artistRepository->searchWithQuery($q);

        return $results;
    }
}
