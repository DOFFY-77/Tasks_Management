<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'image_path' => $this->image_path,
            'name' => $this->name ,
            'description' => $this->description,
            'status' => $this->status,
            'due_date' => (new Carbon($this->due_date))->format('d-m-Y'),
            'created_at' => (new Carbon($this->created_at))->format('d-m-Y'),
            'updated_at' => (new Carbon($this->updated_at))->format('d-m-Y'),  
            'createdBy' => new UserResource($this->createdBy),
            'updatedBy' => new UserResource($this->updatedBy),
        ];
    }
}
