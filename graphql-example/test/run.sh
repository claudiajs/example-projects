#!/bin/bash
#
# all.sh
# Run all GraphQL GRUD tests.
#
cd $(dirname $0)

API_ID=$(node -e 'console.log(require("../claudia.json").api.id)')
export API_ID

echo; echo "-------- show all users"
./all-users.sh

echo; echo "-------- add 2 users"
./add-user.sh

echo; echo "-------- show all users"
./all-users.sh

echo; echo "-------- get a user with userid 4"
./get-a-user.sh

echo; echo "-------- delete a user with userid 4 "
./del-user.sh

echo; echo "-------- show all users"
./all-users.sh

echo; echo
