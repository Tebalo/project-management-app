<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\TaskLabel;
use App\Services\TaskLabelService;
use App\Http\Resources\TaskLabelResource;
use App\Http\Requests\TaskLabel\StoreTaskLabelRequest;
use App\Http\Requests\TaskLabel\UpdateTaskLabelRequest;

class TaskLabelController extends Controller {
    protected $taskLabelService;

    public function __construct(TaskLabelService $taskLabelService) {
        $this->taskLabelService = $taskLabelService;
    }

    public function index(Project $project) {
        $filters = request()->all();

        $labels = $this->taskLabelService->getProjectLabels($project, $filters);

        return inertia('TaskLabels/Index', [
            'project' => $project->only('id', 'name'),
            'labels' => TaskLabelResource::collection($labels),
            'success' => session('success'),
            'queryParams' => $filters,
        ]);
    }

    public function create(Project $project) {
        return inertia('TaskLabels/Create', [
            'project' => $project->only('id', 'name'),
        ]);
    }

    public function edit(Project $project, TaskLabel $label) {
        if (is_null($label->project_id)) {
            abort(403, 'Cannot edit default labels');
        }

        return inertia('TaskLabels/Edit', [
            'project' => $project->only('id', 'name'),
            'label' => new TaskLabelResource($label),
        ]);
    }

    public function store(StoreTaskLabelRequest $request, Project $project) {
        $data = $request->validated();
        $data['project_id'] = $project->id;

        $label = $this->taskLabelService->storeLabel($data);

        return to_route('project.labels.index', $project)->with('success', "Label '{$label->name}' created successfully.");
    }

    public function update(UpdateTaskLabelRequest $request, Project $project, TaskLabel $label) {
        if (is_null($label->project_id)) {
            abort(403, 'Cannot edit default labels');
        }

        $label = $this->taskLabelService->updateLabel($label, $request->validated());
        return to_route('project.labels.index', $project)
            ->with('success', "Label '{$label->name}' updated successfully.");
    }

    public function destroy(Project $project, TaskLabel $label) {
        if (is_null($label->project_id)) {
            abort(403, 'Cannot delete default labels');
        }

        $name = $label->name;
        $this->taskLabelService->deleteLabel($label);
        return to_route('project.labels.index', $project)
            ->with('success', "Label '{$name}' deleted successfully.");
    }
}
