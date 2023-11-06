# My Course Evaluation PR Checklist
As this is an open source project, we request contributors (in good faith) to follow the PR review guidelines below;
## General 
- [ ] Read the PR description
- [ ] Is the PR descriptive enough?
- [ ] The PR can run locally without errors
- [ ] Coverage is >80% (Check Coverage report)
- [ ] Check that there are no linting errors
- [ ] Check that CI pipeline is passing 
- [ ] Changed files doesnot exceed 100 (PR should be small for easy review)
## Specifics
- [ ] Read through all the changes, considering the following questions.
  - [ ] Is there anything you can praise about this PR? Start with praise.
  - [ ] Are variable names brief but descriptive?
  - [ ] Are new/changed functions no longer than a paragraph?
  - [ ] Do all function parameters have default values where appropriate?
  - [ ] Is the code clear and clean? (see Robert C. Martin's Clean Code)
  - [ ] Does the programming style meet the requirements of the repository (PEP8 for python Backend, and ES2023 Frontend)
  - [ ] If a new feature has been added, or a bug fixed, has a test been added to confirm good behavior?
  - [ ] Does the test actually test the new/changed functionality?
  - [ ] Does the test successfully test edge cases?
  - [ ] Does the test successfully test corner cases?
  - [ ] Do all files in the PR belong in the repository?
  - [ ] If the PR deletes files, is this appropriate?
  - [ ] Does this PR close an issue? If so, be sure to descriptively close this issue when the PR is merged.
  - [ ] Make a review, leaving kind comments and suggesting changes where needed (to resolve the above).
- [ ] When you approve of the PR, merge and close it.
- [ ] Thank the author for their contribution.