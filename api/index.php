<?php
header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
header("Expires: Sat, 26 Jul 1997 05:00:00 GMT"); // Date in the past
date_default_timezone_set('America/New_York');
require_once 'meekrodb.2.1.class.php';
require_once 'db.config.php';
DB::$param_char = '%%';

$action = isset($_GET['action']) ? $_GET['action'] : $_POST['action'];

switch ($action) {
    //users
    case 'usersGet' :
        $results = DB::query('SELECT id, name, active FROM users');
    break;
    //calls
    case 'callsAdd' :
        //-add = add new call
        //---pass in name, phone, message, date (name or phone required)
        //---return success/fail
        if ((isset($_POST['name'])) || (isset($_POST['phone']))) {
            $columns = array();
            $columns['name'] = isset($_POST['name']) ? $_POST['name'] : NULL;
            $columns['phone'] = isset($_POST['phone']) ? $_POST['phone'] : NULL;
            $columns['message'] = isset($_POST['message']) ? $_POST['message'] : NULL;
            $columns['received'] = isset($_POST['received']) ? $_POST['received'] : NULL;
            $results = DB::insert('calls', $columns);
        }
    break;

    case 'callsGet' :
        //-get = get list of calls
        //---pass in completed (required)
        //---return *
        if (isset($_GET['completed'])) {
            $results = DB::query('SELECT id, name, phone, message, DATE_FORMAT(received, "%Y%m%dT%H%i%s") as received, completed FROM calls WHERE completed=%%s ORDER BY received ASC', $_GET['completed']);
        }
    break;

    case 'callsUpdate' :
        // update = change completed status
        // pass in id (required)
        // return success/fail
        if (isset($_GET['id'])) {
            $results = DB::update('calls', array('completed' => DB::sqleval("NOT completed")), 'id=%%s', $_GET['id']);
        }
    break;

    //call notes
    case 'notesAdd' :
        //-add = add note
        //---pass in call id, user id, comments (all required)
        //---return success/fail
        if ((isset($_POST['callID'])) && (isset($_POST['userID'])) && (isset($_POST['comments']))) {
            $columns = array();
            $columns['callID'] = $_POST['callID'];
            $columns['userID'] = $_POST['userID'];
            $columns['notesDate'] = date('Y-m-d H:i:s');
            $columns['comments'] = $_POST['comments'];
            $results = DB::insert('notes', $columns);
        }
    break;

    case 'notesGet' :
        //-get = get all notes for a particular call
        //---pass in call id (required)
        //---return *
        if (isset($_GET['call'])) {
            $results = DB::query('SELECT id, callID, userID, DATE_FORMAT(notesDate, "%Y%m%dT%H%i%s") as notesDate, comments FROM notes WHERE callID=%%s ORDER BY notesDate DESC', $_GET['call']);
        }
    break;
}

//return query results as JSON
echo json_encode($results);