#!/bin/sh

export SUSER=alex
export SPATH=/home/madek/schaufenster.hfg-karlsruhe.de/www/
export SSERVER=madek.hfg-karlsruhe.de
ssh $SUSER@$SSERVER "sudo chown -R $SUSER:users $SPATH"
rsync -avz placeholder-page $SUSER@$SSERVER:$SPATH
ssh $SUSER@$SSERVER "sudo chown -R madek:users $SPATH"

