<?php

namespace App\Entity;

use App\Repository\ApplyRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ApplyRepository::class)]
class Apply
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $message = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $created_at = null;

    #[ORM\Column(length: 255)]
    private ?string $status = null;

    #[ORM\ManyToOne(inversedBy: 'applies')]
    private ?offer $offer = null;

    /**
     * @var Collection<int, candidate>
     */
    #[ORM\OneToMany(targetEntity: candidate::class, mappedBy: 'apply')]
    private Collection $candidate;

    public function __construct()
    {
        $this->candidate = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getMessage(): ?string
    {
        return $this->message;
    }

    public function setMessage(string $message): static
    {
        $this->message = $message;

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

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): static
    {
        $this->status = $status;

        return $this;
    }

    public function getOffer(): ?offer
    {
        return $this->offer;
    }

    public function setOffer(?offer $offer): static
    {
        $this->offer = $offer;

        return $this;
    }

    /**
     * @return Collection<int, candidate>
     */
    public function getCandidate(): Collection
    {
        return $this->candidate;
    }

    public function addCandidate(candidate $candidate): static
    {
        if (!$this->candidate->contains($candidate)) {
            $this->candidate->add($candidate);
            $candidate->setApply($this);
        }

        return $this;
    }

    public function removeCandidate(candidate $candidate): static
    {
        if ($this->candidate->removeElement($candidate)) {
            // set the owning side to null (unless already changed)
            if ($candidate->getApply() === $this) {
                $candidate->setApply(null);
            }
        }

        return $this;
    }
}
