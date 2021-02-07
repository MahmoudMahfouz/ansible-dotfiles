add_ssh_keys() {
    ssh-add -K ~/.ssh/*
    ssh-add -K ~/.ssh_private_keys/id_rsa
}

add_ssh_keys
