add_ssh_keys() {
    ls ~/.ssh | grep -v "known_hosts" | grep -v ".pub" | xargs -I{} ssh-add ~/.ssh/{}
}

add_ssh_keys

