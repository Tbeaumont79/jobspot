<?php
namespace App\Repository;

use App\Entity\Company;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class CompanyRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Company::class);
    }

    public function findByOfferId(int $offerId): ?Company
    {
        return $this->createQueryBuilder('c')
            ->innerJoin('c.offers', 'o')
            ->andWhere('o.id = :offerId')
            ->setParameter('offerId', $offerId)
            ->getQuery()
            ->getOneOrNullResult();
    }

    public function findByOfferIds(array $offerIds): array
    {
        return $this->createQueryBuilder('c')
            ->innerJoin('c.offers', 'o')
            ->andWhere('o.id IN (:offerIds)')
            ->setParameter('offerIds', $offerIds)
            ->getQuery()
            ->getResult();
    }
}
