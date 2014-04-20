<?php

class FileHandler
{
  /**
   * Receive an base64 string image, then decode and upload it
   * @param  $uploadDir Destination directory where image will be uploaded to
   * @param  $image     A base64 string represented for an image
   * @param  $fileType  File extension (jpg, png)
   * @return $url       Image path after uploading
   */
  public static function upload ($uploadDir, $image, $fileType)
  {
    FileHandler::createDir($uploadDir);
    // Generate a randomly unique filename
    /* $filename = 'uploads/'.uniqid().'.jpg'; */
    $filename = $uploadDir.'/'.uniqid().'.'.$fileType;

    // Decode image base64 which sent from client 
    $image = base64_decode($image);

    // Upload the image to server
    file_put_contents ($filename, $image);

    return $filename;
  }

  /**
   * this function create an dir upon order number
   * @param upload dir $uploadDir
   */
  private static function createDir($uploadDir)
  {
    $dir = $uploadDir. '/';
    if (!file_exists($dir) and !is_dir($dir)) 
    {
      mkdir($dir, 0777);
    }
  }

}

