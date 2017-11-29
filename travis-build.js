const travisPing = require("travis-ping");

const repos = [
    "unitejs-test-packages/aurelia-packages",
    "unitejs-test-packages/angular-packages",
    "unitejs-test-packages/polymer-packages",
    "unitejs-test-packages/preact-packages",
    "unitejs-test-packages/react-packages",
    "unitejs-test-packages/vanilla-packages",
    "unitejs-test-packages/vue-packages"
];

console.log("Testing Branch", process.env.TRAVIS_BRANCH);

let repoCounter = 0;
const pingRepo = (index) => {
    console.log("Pinging", repos[repoCounter]);
    travisPing.ping(
        { github_token: process.env.GITHUB_ACCESS_TOKEN },
        repos[repoCounter],
        { branch: process.env.TRAVIS_BRANCH },
        (travisResponse) => {
            if (travisResponse) {
                console.log(JSON.stringify(travisResponse))
            } else {
                console.log("Completed Successfully");
            }
            repoCounter++;
            if (repoCounter < repos.length) {
                setTimeout(() => pingRepo(repoCounter), 10000);
            }
        }
    )
};
pingRepo(repoCounter);