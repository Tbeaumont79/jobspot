<?php

namespace App\Entity;

use App\Repository\CandidateRepository;
use ApiPlatform\Metadata\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Delete;

#[ORM\Entity(repositoryClass: CandidateRepository::class)]
#[ApiResource]
#[Put(security: "is_granted('ROLE_CANDIDATE') or is_granted('ROLE_ADMIN')")]
#[Delete(security: "is_granted('ROLE_CANDIDATE') or is_granted('ROLE_ADMIN')")]
class Candidate
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['candidate:read', 'candidate:write'])]
    #[ORM\Column(length: 150, nullable: true)]
    private ?string $cv = null;

    #[Groups(['candidate:read', 'candidate:write'])]
    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private string $skills = '';

    #[Groups(['candidate:read', 'candidate:write'])]
    #[ORM\Column(nullable: true)]
    private ?int $years_of_experience = null;

    #[Groups(['candidate:read', 'candidate:write'])]
    #[ORM\Column]
    private ?\DateTimeImmutable $available_at = null;

    #[Groups(['candidate:read', 'candidate:write'])]
    /**
     * @var Collection<int, user>
     */
    #[ORM\OneToMany(targetEntity: user::class, mappedBy: 'candidate')]
    private Collection $user;

    #[ORM\ManyToOne(inversedBy: 'candidate')]
    private ?Apply $apply = null;

    public function __construct()
    {
        $this->user = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCv(): ?string
    {
        return $this->cv;
    }

    public function setCv(string $cv): static
    {
        $this->cv = $cv;

        return $this;
    }

    public function getSkills(): string
    {
        return $this->skills;
    }

    public function setSkills(string $skills): static
    {
        $this->skills = $skills;

        return $this;
    }

    public function getYearsOfExperience(): ?int
    {
        return $this->years_of_experience;
    }

    public function setYearsOfExperience(?int $years_of_experience): static
    {
        $this->years_of_experience = $years_of_experience;

        return $this;
    }

    public function getAvailableAt(): ?\DateTimeImmutable
    {
        return $this->available_at;
    }

    public function setAvailableAt(\DateTimeImmutable $available_at): static
    {
        $this->available_at = $available_at;

        return $this;
    }

    /**
     * @return Collection<int, user>
     */
    public function getUser(): Collection
    {
        return $this->user;
    }

    public function addUser(user $user): static
    {
        if (!$this->user->contains($user)) {
            $this->user->add($user);
            $user->setCandidate($this);
        }

        return $this;
    }

    public function removeUser(user $user): static
    {
        if ($this->user->removeElement($user)) {
            // set the owning side to null (unless already changed)
            if ($user->getCandidate() === $this) {
                $user->setCandidate(null);
            }
        }

        return $this;
    }

    public function getApply(): ?Apply
    {
        return $this->apply;
    }

    public function setApply(?Apply $apply): static
    {
        $this->apply = $apply;

        return $this;
    }
}
