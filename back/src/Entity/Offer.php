<?php

namespace App\Entity;

use App\Enum\StatusEnum;
use App\Repository\OfferRepository;
use ApiPlatform\Metadata\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;

#[ORM\Entity(repositoryClass: OfferRepository::class)]
#[ApiResource]
class Offer
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['offer:read'])]
    #[ORM\Column(length: 255)]
    private ?string $title = null;

    #[Groups(['offer:read'])]
    #[ORM\Column(length: 255)]
    private ?string $description = null;

    #[Groups(['offer:read'])]
    #[ORM\Column(length: 255)]
    private ?string $contractType = null;

    #[Groups(['offer:read'])]
    #[ORM\Column(length: 255)]
    private ?string $salary = null;

    #[Groups(['offer:read'])]
    #[ORM\Column]
    private ?\DateTimeImmutable $created_at = null;

    /**
     * @var Collection<int, tag>
     */
    #[Groups(['offer:read'])]
    #[ORM\ManyToMany(targetEntity: tag::class, inversedBy: 'offers')]
    private Collection $tags;

    #[Groups(['offer:read'])]
    #[ORM\ManyToOne(inversedBy: 'offers')]
    private ?company $company = null;

    /**
     * @var Collection<int, Apply>
     */
    #[Groups(['offer:read'])]
    #[ORM\OneToMany(targetEntity: Apply::class, mappedBy: 'offer')]
    private Collection $applies;

    #[Groups(['offer:read'])]
    #[ORM\Column(type: 'string', enumType: StatusEnum::class)]
    private StatusEnum $status;

    public function __construct()
    {
        $this->tags = new ArrayCollection();
        $this->applies = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getContractType(): ?string
    {
        return $this->contractType;
    }

    public function setContractType(string $contractType): static
    {
        $this->contractType = $contractType;

        return $this;
    }

    public function getSalary(): ?string
    {
        return $this->salary;
    }

    public function setSalary(string $salary): static
    {
        $this->salary = $salary;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->created_at;
    }

    public function setCreatedAt(\DateTimeImmutable $created_at): static
    {
        $this->created_at = $created_at;

        return $this;
    }

    /**
     * @return Collection<int, tag>
     */
    public function getTags(): Collection
    {
        return $this->tags;
    }

    public function addTag(tag $tag): static
    {
        if (!$this->tags->contains($tag)) {
            $this->tags->add($tag);
        }

        return $this;
    }

    public function removeTag(tag $tag): static
    {
        $this->tags->removeElement($tag);

        return $this;
    }

    public function getCompany(): ?company
    {
        return $this->company;
    }

    public function setCompany(?company $company): static
    {
        $this->company = $company;

        return $this;
    }

    /**
     * @return Collection<int, Apply>
     */
    public function getApplies(): Collection
    {
        return $this->applies;
    }

    public function addApply(Apply $apply): static
    {
        if (!$this->applies->contains($apply)) {
            $this->applies->add($apply);
            $apply->setOffer($this);
        }

        return $this;
    }

    public function removeApply(Apply $apply): static
    {
        if ($this->applies->removeElement($apply)) {
            // set the owning side to null (unless already changed)
            if ($apply->getOffer() === $this) {
                $apply->setOffer(null);
            }
        }

        return $this;
    }
    
    public function getStatus(): ?StatusEnum
    {
        return $this->status;
    }

    public function setStatus(StatusEnum $status): static
    {
        $this->status = $status;
        return $this;
    }
}
