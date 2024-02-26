package com.latech.procrastinatorsclient.data.remote

import com.plcoding.ktorclientandroid.data.remote.PostsServiceImpl
import com.latech.procrastinatorsclient.data.remote.dto.PostRequest
import com.latech.procrastinatorsclient.data.remote.dto.PostResponse
import com.latech.procrastinatorsclient.data.remote.dto.PostResponseList
import io.ktor.client.*
import io.ktor.client.engine.android.*
import io.ktor.client.plugins.contentnegotiation.ContentNegotiation
import io.ktor.client.plugins.logging.LogLevel
import io.ktor.client.plugins.logging.Logging
import io.ktor.serialization.kotlinx.json.*

interface PostsService {

    suspend fun getPosts(): PostResponseList?

    suspend fun createPost(postRequest: PostRequest): PostResponse?

    companion object {
        fun create(): PostsService {
            return PostsServiceImpl(
                client = HttpClient(Android) {
                    install(Logging) {
                        level = LogLevel.ALL
                    }
                    install(ContentNegotiation) {
                        json()
                    }
                }
            )
        }
    }
}