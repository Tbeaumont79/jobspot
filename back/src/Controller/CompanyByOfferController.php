<?php
namespace App\Controller;

use App\Entity\Company;
use App\Repository\CompanyRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Routing\Annotation\Route;

#[AsController]
class CompanyByOfferController extends AbstractController
{
    public function __construct(
        private CompanyRepository $companyRepository
    ) {}

    #[Route('/api/companies/by-offer/{offerId}', methods: ['GET'], requirements: ['offerId' => '\d+'])]
    public function getCompanyByOffer(int $offerId): JsonResponse
    {
        if ($offerId <= 0) {
            return new JsonResponse(['error' => 'Invalid offer ID'], 400);
        }

        $company = $this->companyRepository->findByOfferId($offerId);

        if (!$company) {
            return new JsonResponse(['error' => 'No company found for this offer'], 404);
        }

        return $this->json($company, 200, [], ['groups' => ['company:read']]);
    }
}
