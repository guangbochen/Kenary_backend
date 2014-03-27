<?php
class JsonHandler
{
    static function raiseError ($message, $statusCode)
    {
        $data = (object) array (
            'status'  => 'error',
            'message' => $message,
            'code'    => $statusCode
        );
        $response = Response::json($data);
        $response->setStatusCode($statusCode);

        return $response;
    }

    static function raiseMessage ($message, $statusCode)
    {
        $data = (object) array (
            'status'  => 'success',
            'message' => $message,
            'code'   => $statusCode
        );
        $response = Response::json($data);
        $response->setStatusCode($statusCode);

        return $response;
    }

    static function raiseAuthMessage ($data, $statusCode)
    {
        $info = (object) array (
            'status'   => 'success',
            'username' => $data->username,
            'apikey'   => $data->apikey,
            'code'     => $statusCode
        );
        $response = Response::json($info);
        $response->setStatusCode($statusCode);

        return $response;
    }
}
