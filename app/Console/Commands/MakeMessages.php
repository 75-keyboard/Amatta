<?php

namespace App\Console\Commands;

use App\Post;
use App\Message;
use Illuminate\Console\Command;
use Carbon\Carbon;

class MakeMessages extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'message:make';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $items = Post::all();
        $now = Carbon::now();
        foreach ($items as $item) {
            if ($item->dead_at <= $now && !$item->is_sent) {
                $message = new Message();
                $message->post_id = $item->id;
                $message->user_id = $item->user_id;
                $message->is_read = false;
                $message->save();
                $item->is_sent = true;
                $item->save();
            }
        }
    }
}
