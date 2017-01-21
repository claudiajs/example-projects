#
# all-users.sh
#
if [ ! -n "$API_ID" ]; then
    echo "Missing API_ID."
    exit 1
fi

curl -H 'Content-Type: application/graphql' -X POST \
  -d '{user {userid name age}}' \
  'https://'${API_ID}'.execute-api.us-east-1.amazonaws.com/latest/graphql'
