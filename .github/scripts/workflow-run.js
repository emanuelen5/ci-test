module.exports = async ({github, context, core}) => {
    const owner = context.repo.owner;
    const repo = context.repo.repo;
    const sha = "${{ github.event.workflow_run.head_commit.id }}";
    const workflow_ids = ["example.yml", "example2.yml"];
    let allSucceeded = true;

    for (const workflow_id of workflow_ids) {
        const runs = await github.rest.actions.listWorkflowRuns({
            owner,
            repo,
            workflow_id,
            branch: "main", // Adjust this as necessary
        });
        console.log(JSON.stringify(runs.data));
        const recentRun = runs.data.workflow_runs.find(run => run.head_sha === sha);
        console.log(recentRun);
        if (!recentRun || recentRun.conclusion !== 'success') {
            allSucceeded = false;
            break;
        }
    }

    return allSucceeded;
}