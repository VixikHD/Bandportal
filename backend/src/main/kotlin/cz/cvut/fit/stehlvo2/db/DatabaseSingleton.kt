package cz.cvut.fit.stehlvo2.db

import com.zaxxer.hikari.HikariConfig
import com.zaxxer.hikari.HikariDataSource
import cz.cvut.fit.stehlvo2.db.dao.*
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.StdOutSqlLogger
import org.jetbrains.exposed.sql.addLogger
import org.jetbrains.exposed.sql.transactions.transaction

fun createHikariConfig(): HikariDataSource {
    val config = HikariConfig()

    config.driverClassName = "org.postgresql.Driver"
    config.jdbcUrl = "jdbc:postgresql://localhost:5432/bandportal"
    config.username = "postgres"
    config.password = ""
    config.maximumPoolSize = 3
    config.isAutoCommit = false
    config.transactionIsolation = "TRANSACTION_REPEATABLE_READ"
    config.validate()

    return HikariDataSource(config)
}

object DatabaseSingleton {
    fun init() {
        Database.connect(HikariDataSource(createHikariConfig()))

        transaction {
            addLogger(StdOutSqlLogger)

            SchemaUtils.create(Bands)
            SchemaUtils.create(Places)
            SchemaUtils.create(Events)
            SchemaUtils.create(EventBands)
            SchemaUtils.create(Tickets)
        }
    }
}

