<?php

namespace App\Controller;

use App\Repository\MusicRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class MusicSearchController extends AbstractController
{

    protected MusicRepository $musicRepository;

    public function __construct(MusicRepository $musicRepository)
    {
        $this->musicRepository = $musicRepository;
    }

    public function __invoke(Request $request)
    {
        $q = $request->get('q');

        if (!$q) {
            throw new BadRequestHttpException("Vous devez fournir un paramètre 'q' pour votre recherche !");
        }

        $results = $this->musicRepository->searchWithQuery($q);

        return $results;
    }
}
