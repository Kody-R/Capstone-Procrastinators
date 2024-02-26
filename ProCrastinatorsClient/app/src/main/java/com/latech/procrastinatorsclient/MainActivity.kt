package com.latech.procrastinatorsclient

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.produceState
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.latech.procrastinatorsclient.ui.theme.ProCrastinatorsClientTheme
import com.latech.procrastinatorsclient.data.remote.PostsService
import com.latech.procrastinatorsclient.data.remote.dto.PostResponse
import com.latech.procrastinatorsclient.data.remote.dto.PostResponseList

class MainActivity : ComponentActivity() {

    private val service = PostsService.create()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
//            val posts = produceState<PostResponseList>(
//                initialValue = PostResponseList(emptyList()),
//                producer = {
//                    value = service.getPosts()
//                }
//            )
            ProCrastinatorsClientTheme {
//                Surface(color = MaterialTheme.colorScheme.background) {
//                    LazyColumn {
//                        items(posts.value) {
//                            Column(
//                                modifier = Modifier
//                                    .fillMaxWidth()
//                                    .padding(16.dp)
//                            ) {
//                                Text(text = it.title, fontSize = 20.sp)
//                                Spacer(modifier = Modifier.height(4.dp))
//                                Text(text = it.body, fontSize = 14.sp)
//                            }
//                        }
//                    }
//                }
                Greeting(message = "Welcome to ProCrastinator")
            }
        }
    }

}

//ws: AppWebSocketClient, messages: List<HashMap<String, Any>>,
@Composable
fun Greeting(message: String?, modifier: Modifier = Modifier) {
    Box (
        Modifier
            .fillMaxSize()
            .background(
                color = Color(0xf767b4ff)
            ),
        contentAlignment = Alignment.Center
    ) {
        Text(text = "Message Received: $message")
    }
}
