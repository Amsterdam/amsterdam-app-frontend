# Push code to GitHub

We make our code available as open source on GitHub: [https://github.com/Amsterdam/amsterdam-app-frontend](https://github.com/Amsterdam/amsterdam-app-frontend)

Publishing code as open source is a best practice. For the City of Amsterdam, GitHub is the place to do it. Because we want to keep the Azure DevOps repos as the source of truth, we have added a job to the build pipeline that automatically publishes the source code to GitHub on every front end build.

## Configuration

The pipelines are configured via these files:

- `pipelines/publish.yml` - contains the set up for the job "Push_to_github"
- `pipelines/templates/push-repo-to-github.yml` - contains the configuration for this job

This configuration uses the SSH variables, username and email address as defined in the variable group [github-authorization](https://dev.azure.com/CloudCompetenceCenter/Amsterdam-App/_library?itemType=VariableGroups).

Note that the SHH connection to GitHub is similar to the [Storybook release config](https://dev.azure.com/CloudCompetenceCenter/Amsterdam-App/_release?_a=releases&definitionId=3&view=mine).

## Further instructions

https://dev.azure.com/CloudCompetenceCenter/Amsterdam-App/_wiki/wikis/Amsterdam-App.wiki/3329/Publiceer-source-code-naar-github
