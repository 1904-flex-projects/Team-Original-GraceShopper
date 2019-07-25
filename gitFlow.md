KEEP BRANCHES SMALL!!!!!!
MAKE SURE WE ALL KNOW WHAT EVERYONE IS WORKING ON SO WE DONT WORK ON THE SAME FILES!!

#make a new branch everytime you work on something. Never work directly on the dev branch:

```
git checkout -b <branch name>
```

#commit your branch often to your local and forked repo:

```
git add <files>
git commit -m 'your message'
```

#when you are ready to merge in to the upstream dev branch,
#make sure that the dev branch is up to date with upstream dev:

```
git checkout dev
git pull upstream dev
```

#switch back to your working branch:

```
git checkout <branch name>
```

#rebase the latest dev branch under the head of your working branch:

```
git rebase dev
```

IF THERE IS A MERGE CONFLICT TALK WITH THE GROUP BEFORE CHANGING ANYTHING

#push branch to your forked repo.
#do a pull request of your branch to the upstream dev.

#once pull request is approved update your local dev branch

rinse and repeat

## pre-commit hook

add the pre-commit hook to your local repo to
disable commiting on master and dev branches.

## tips

- if you find yourself doing work on the dev branch:

  - just checkout a new branch and continue working.

- if you need to make changes to something thats NOT related to the branch you are on:

  - checkout to a new branch,
  - change what needs to be changed
  - stage and commit those files to that branch
  - stash unstaged files using
    ```
    git stash
    ```
  - move back to the original branch and use

    ```
    git stash apply
    ```

    or

    ```
    git stash apply stash@{<stash #>}
    ```

    (if you have multiple stashes
    use 'git stash list' to see all your stashes)

  - ```
    git stash drop
    ```

    to remove the most recent stash from your stash list

  - rebase the changes you made in the other branch into your working branch
  - resolve any merge conflicts

- delete branches that you have done successful prs on and don't plan on working on anymore:
  ```
  git -D <branch name>
  ```

# accidentally pull/commit something you didnt want to?

roll back one commit

```
//keeps the uncommited work
git reset soft HEAD~1
// OR
// removes everything thats not in
// the previous commit
git reset hard HEAD~1
```
