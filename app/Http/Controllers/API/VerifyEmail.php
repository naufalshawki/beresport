<?php

namespace App\Http\Controllers\API;

use App\user;
use Crypt;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class VerifyEmail extends Mailable
{
    use Queueable, SerializesModels;
    private $user;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(User $user)
    {
        $this->user = $user;
    }
    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        // generate link
        $encryptedEmail = Crypt::encrypt($this->user->email);
        // ex: domain.com/verify?token=xxxx
        $link = route('signup.verify', ['token' => $encryptedEmail]);
        return $this->subject('Konfirmasi Alamat Email Anda')
            ->with('link', $link)
            ->view('email.email');
    }

}
